const Restaurant = require("../models/restaurant");
const Avis = require("../models/avis");
const { validationResult } = require("express-validator");

exports.getAvisIDrestaurant = async (req, res) => {
  try {
    const avis = await Avis.find({
      restaurantID: req.params.id,
    }).select("-restaurantID");
    if (avis) return res.status(200).json({ success: true, msg: avis });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Pas d'avis");
  }
};
exports.getAvisIDclient = async (req, res) => {
  try {
    const avis = await Avis.find({
      clientID: req.compte.clientID,
    }).select("-restaurantID -clientID");
    if (avis) return res.status(200).json({ success: true, msg: avis });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Pas d'avis");
  }
};

exports.newAvis = async (req, res) => {
  //
  try {
    let restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(400).send("Restaurant invalide...");
    }
    //find matching restaurant if it exists

    //
    let errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //validates the input

    let avis = new Avis({
      clientID: req.compte.clientID,
      restaurantID: req.params.id,
      nomAuteur: req.compte.nom,
      nombreEtoile: req.body.nombreEtoile,
      commentaire: req.body.commentaire,
    });
    avis = await avis.save();

    //update noteMoyenne
    restaurant.noteMoyenne =
      (restaurant.noteMoyenne * restaurant.nbrAvis +
        parseInt(req.body.nombreEtoile)) /
      (restaurant.nbrAvis + 1);
    console.log(restaurant.noteMoyenne);
    //update nbrAvis
    restaurant.nbrAvis++;

    restaurant.avis.push(avis);
    await restaurant.save();

    res.status(200).json({ success: true, msg: restaurant });
  } catch (err) {
    res.status(400).send("Erreur...");
  }
};

exports.deleteAvis = async (req, res) => {
  Avis.findOneAndDelete({ _id: req.params.id, clientID: req.compte.clientID })
    .then((avis) => {
      //console.log(avis);
      Restaurant.findByIdAndUpdate(avis.restaurantID, {
        $pull: {
          avis: req.params.id,
        },
      })
        .then((restaurant) => {
          //update noteMoyenne
          if (restaurant.nbrAvis > 1) {
            restaurant.noteMoyenne =
              (restaurant.noteMoyenne * restaurant.nbrAvis -
                avis.nombreEtoile) /
              (restaurant.nbrAvis - 1);
          } else {
            restaurant.noteMoyenne = 0;
          }

          //update nbrAvis
          restaurant.nbrAvis--;

          restaurant
            .save()
            .then(() => {
              res
                .status(200)
                .json({ success: true, msg: "Avis supprimer avec succés" });
            })
            .catch(() => {
              res
                .status(500)
                .send("Erreur pendant l'enregistrement des changements");
            });
        })
        .catch((err) => {
          res
            .status(400)
            .json({ success: false, msg: "Erreur pendant la suppression" });
        });
    })
    .catch((err) => {
      res
        .status(400)
        .json({ success: false, msg: "Erreur pendant la suppression" });
    });
};
