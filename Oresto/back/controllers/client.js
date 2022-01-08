const { validationResult } = require("express-validator");

const Compte = require("../models/compte");
const Client = require("../models/client");

const { crypterMdp } = require("../hash");

exports.newClient = async (req, res) => {
  let token;
  //validation tests
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors.array());
  }
  const cptExist = await Compte.findOne({ email: req.body.email });
  if (cptExist) {
    errors = { msg: "Compte déjà existant" };
    return res.status(400).json([errors]);
  }

  const mdpHashed = await crypterMdp(req.body.motdepasse);

  //Si les données sont valide alors commencer l'enregistrement
  const savedCompte = async () => {
    const compte = new Compte({
      email: req.body.email,
      motdepasse: mdpHashed,
      type: req.body.type,
    });

    const result = await compte.save();
    console.log("Saving compte..");
    return result;
  };

  const savedClient = async () => {
    const nvCompte = await savedCompte();

    const client = new Client({
      nom: req.body.nom,
      age: req.body.age,
      contact: {
        rue: req.body.rue,
        ville: req.body.ville,
        codePostal: req.body.codePostal,
        numTel: req.body.numTel,
      },
      compte: nvCompte,
    });

    let result = await client.save();
    token = nvCompte.generateAuthToken({
      clientID: client._id,
      nom: client.nom,
      age: client.age,
      contact: client.contact,
    });
    console.log("Saving client..");
    return result;
  };
  const nvClient = await savedClient();

  res
    .status(201)
    .header("x-login-token", token)
    .send({
      success: true,
      msg: {
        _id: nvClient._id,
        nom: nvClient.nom,
        age: nvClient.age,
        numTel: nvClient.contact.numTel,
      },
    });
};
