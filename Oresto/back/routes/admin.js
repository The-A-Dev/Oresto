const express = require("express");
const auth = require("../middleware/auth");
const Gerant = require("../models/gerant");
const Restaurant = require("../models/restaurant");
const router = express.Router();

router.get("/gerant", async (req, res) => {
  try {
    const gerants = await Gerant.find({});

    if (gerants) return res.status(200).json({ sucess: true, msg: gerants });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Aucun gerant n'a été trouver");
  }
});

const maj = async (req, res, etat) => {
  try {
    //
    let gerant = await Gerant.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        etat: etat,
      }
    );
    //finds commande if the client matches the creator or the owner of the restaurant of commande
    if (!gerant) {
      return res.status(400).json("Erreur de modification: gerant inexistant");
    }
    let restaurant = await Restaurant.findOneAndUpdate(
      {
        _id: gerant.restaurant,
      },
      {
        etat: etat,
      }
    );
    if (!restaurant) {
      return res
        .status(400)
        .json("Erreur de modification: restaurant inexistant");
    }
    return res.status(200).json({ success: true, msg: `Gerant ${etat} ` });
  } catch (err) {
    return res.status(400).json("Erreur de modification de l'etat du gerant");
  }

  //finds, updates and sends back commande with "whatever" state is in the "etat" param
  //with a filter in the "filter" param
};

const updateEtatGerant = async (req, res) => {
  return maj(req, res, req.body.etat);
};

router.put("/gerant/:id/etat", auth.admin, updateEtatGerant);

module.exports = router;
