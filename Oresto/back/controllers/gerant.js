const { validationResult } = require("express-validator");

const Compte = require("../models/compte");
const Gerant = require("../models/gerant");
const Restaurant = require("../models/restaurant");
const restaurantControler = require("../controllers/restaurant");

//const { response } = require("express");
const { crypterMdp } = require("../hash");

exports.newGerant = async (req, res) => {
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

  const savedCompte = async () => {
    const compte = new Compte({
      email: req.body.email,
      motdepasse: mdpHashed,
      type: req.body.type, //or hardcode "ROLE_GERANT"
    });
    const result = await compte.save();

    console.log("Saving compte..");
    return result;
  };

  //! i moved the creation of the restaurnat in the restaurant controler so i can use there
  // const savedRestaurant = async () => {
  //   const restaurantData = req.body.restaurant;
  //   const restaurant = new Restaurant({
  //     nom: restaurantData.nom,
  //     ville: restaurantData.ville,
  //     urlPhotos: restaurantData.urlPhotos,
  //     tags: restaurantData.tags,
  //     coordonnee: restaurantData.coordonnee,
  //   });

  //   const result = await restaurant.save();
  //   console.log("Saving restaurant..");
  //   return result;
  // };

  const savedRestaurant = async () => {
    return restaurantControler.NewRestaurant(req, res);
  };

  const savedGerant = async () => {
    const nvCompte = await savedCompte();
    const nvRestau = await savedRestaurant();

    const gerant = new Gerant({
      nom: req.body.nom,
      age: req.body.age,
      nomRestaurant: req.body.restaurant.nom,
      numTel: req.body.numTel,
      restaurant: nvRestau,
      compte: nvCompte,
    });
    const result = await gerant.save();
    console.log("Saving gerant..");
    token = nvCompte.generateAuthToken({
      gerantID: gerant._id,
      nom: gerant.nom,
      age: gerant.age,
      numTel: gerant.numTel,
      restaurant: gerant.restaurant._id, //ajouter ._id pour plus de précision
    });
    return result;
  };

  const newGerant = await savedGerant();
  res.status(201).header("x-login-token", token).json({
    success: true,
    msg: newGerant,
  });
};
