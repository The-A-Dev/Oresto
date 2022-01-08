const Restaurant = require("../models/restaurant");

const { validationResult } = require("express-validator");
const { findById } = require("../models/restaurant");
const { response } = require("express");

exports.getRestaurantById = async (req, res) => {
  //Pour les clients

  try {
    const restaurant = await Restaurant.findById(req.params.id).select(
      "-commandes -reservations"
    );
    if (restaurant)
      return res.status(200).json({ success: true, msg: restaurant });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Pas de restaurant");
  }
};

exports.getAllRestaurants = async (req, res) => {
  //Pour tester
  const restaurants = await Restaurant.find({}).select(
    "-commandes -reservations -formReservation -menu -avis -derniersEvenements"
  );
  try {
    if (restaurants)
      return res.status(200).json({ sucess: true, msg: restaurants });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Aucun restaurant n'a été trouver");
  }
};

exports.getRestaurantsByVille = async (req, res) => {
  try {
    const restaurants = await Restaurant.find({
      ville: req.params.ville,
      etat: "Actif",
    }).select(
      "-commandes -reservations -formReservation -menu -avis -derniersEvenements"
    );
    if (restaurants)
      return res.status(200).json({ sucess: true, msg: restaurants });
    else throw new Error();
  } catch (err) {
    return res.status(400).send("Aucun restaurant n'a été trouver");
  }
};

exports.majMenu = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.compte.restaurant,
      {
        menu: req.body,
      },
      { new: true }
    );
    res.status(200).json({ success: true, msg: restaurant });
  } catch (err) {
    res.status(500).send("Erreur du serveur");
  }
};

exports.updateFormReservation = async (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    let restaurant = await Restaurant.findByIdAndUpdate(
      req.compte.restaurant,
      {
        formReservation: req.body.formReservation,
      },
      { new: true }
    );
    if (!restaurant) return res.status(400).send("Restaurant introuvable");
    res.status(200).json({ success: true, retauarant: restaurant });
  } catch (err) {
    res.status(400).send("Erreur pendant la mise a jour du formulaire");
  }
};

exports.NewRestaurant = async (req, res) => {
  const restaurantData = req.body.restaurant;
  console.log(req.body);
  const restaurant = new Restaurant({
    nom: restaurantData.nom,
    description: restaurantData.description,
    ville: restaurantData.ville,
    urlPhotos: restaurantData.urlPhotos,
    tags: restaurantData.tags,
    coordonnee: restaurantData.coordonnee,
  });

  const result = await restaurant.save();
  console.log("Saving restaurant..");
  return result;
};
