const { body, validationResult } = require("express-validator");
const Compte = require("../models/compte");
const Client = require("../models/client");
const Gerant = require("../models/gerant");

const router = require("./client");
const bcrypt = require("bcrypt");

// const config = require("config");
// const jwt = require("jsonwebtoken");

//login
router.post(
  "/",
  [
    body("email", "Entrer un email valide").isEmail(),
    body("motdepasse", "Entrer un mot de passe valide").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let token;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array());
    }
    let compte = await Compte.findOne({ email: req.body.email });
    if (!compte) return res.status(400).send("Email ou mot de passe invalide");

    const validMdp = await bcrypt.compare(
      req.body.motdepasse,
      compte.motdepasse
    );
    if (!validMdp)
      return res.status(400).send("Email ou mot de passe invalide");

    //email et mot de passe correct => identifier le type du compte
    if (compte.type == "ROLE_CLIENT") {
      const client = await Client.findOne({ compte: compte._id });
      token = compte.generateAuthToken({
        clientID: client._id,
        nom: client.nom,
        age: client.age,
        contact: client.contact,
      });
    } else if (compte.type == "ROLE_GERANT") {
      const gerant = await Gerant.findOne({ compte: compte._id });
      if (gerant.etat === "En attente") {
        return res.status(400).send("Votre compte n'a pas encore été confirmé");
      } else if (gerant.etat === "Rejeté") {
        return res.status(400).send("Votre demande d'adhésion a été rejeté");
      }

      token = compte.generateAuthToken({
        gerantID: gerant._id,
        nom: gerant.nom,
        age: gerant.age,
        numTel: gerant.numTel,
        nomRestaurant: gerant.nomRestaurant,
        restaurant: gerant.restaurant._id, //ajouter ._id pour plus de précision
      });
    } else if (compte.type == "ROLE_ADMIN") {
      token = compte.generateAuthToken({});
    }

    res.status(200).header("x-login-token", token).send(true);
  }
);

module.exports = router;
