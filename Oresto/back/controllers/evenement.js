const { validationResult } = require("express-validator");

const Restaurant = require("../models/restaurant");
const Evenement = require("../models/evenement");

//const { response } = require("express");
// const { crypterMdp } = require("../hash");
// const Compte = require("../models/compte");
// const Gerant = require("../models/gerant");

exports.getEvenementsIDrestaurant = async (req, res) => {
  try {
    const evenement = await Evenement.find({
      restaurantID: req.params.id,
    }).select("-restaurantID");
    if (evenement)
      return res.status(200).json({ success: true, msg: evenement });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Pas d'evenements");
  }
};

exports.newEvenement = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //Enregistrer l'evenement
    let event = new Evenement({
      restaurantID: req.compte.restaurant,
      nom: req.body.nom,
      imgUrl: req.body.imgUrl,
      dateEvenement: req.body.dateEvenement,
      description: req.body.description,
    });
    event = await event.save();
    //Enregistrer la referance de l'évenement dans le modele du restaurant
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.compte.restaurant,
      {
        $push: {
          derniersEvenements: event,
        },
      },
      { new: true }
    );
    res.status(201).json({ success: true, msg: event });
  } catch (err) {
    res.status(400).json({ success: false, msg: err });
  }
};

// exports.updateEvemement = async (req, res) => {
//   try {
//     const evenement = await Evenement.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         restaurantID: req.compte.restaurant,
//       },
//       req.body,
//       {
//         new: true,
//       }
//     );
//     if (evenement.updateCount == 0) {
//       return res.status(400).send("Evenement introuvable");
//     }
//     res.status(200).json({ success: true, msg: evenement });
//   } catch (err) {
//     res.status(400).send({ success: false, msg: "Evenement invalide" });
//   }
// };

exports.deleteEvenement = (req, res) => {
  Evenement.findOneAndDelete({
    _id: req.params.id,
    restaurantID: req.compte.restaurant,
  })
    .then((evenement) => {
      //Supprimer l'evenement du tableau des derniersEvenements dans le modele Restaurant
      Restaurant.findByIdAndUpdate(
        evenement.restaurantID, //id restaurant
        {
          $pull: {
            derniersEvenements: req.params.id,
          },
        }
      )
        .then(() => {
          res
            .status(200)
            .json({ success: true, msg: "Evénement supprimé avec succés." });
        })
        .catch((err) => {
          res.status(400).json({ success: false, msg: err });
        });
    })
    .catch((err) => {
      res.status(400).json({ success: false, msg: "Evenement invalide" });
    });
};
