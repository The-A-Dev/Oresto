const Restaurant = require("../models/restaurant");
const { validationResult } = require("express-validator");
const Reservation = require("../models/reservation");

exports.newReservation = async (req, res) => {
  //
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //validates the reservation syntax

  //
  try {
    let restaurant = await Restaurant.findOne({ _id: req.params.id });
    if (!restaurant)
      return res.status(400).json("Pas de restaurant avec cet ID");
    //check at first if there exists a corresponding restaurant here then it would proceed the method
    //and keep the exsistant restaurant

    //

    //
    let reservation = new Reservation({
      clientID: req.compte.clientID,
      nom: req.compte.nom,
      nomRestaurant: restaurant.nom,
      numTel: req.compte.contact.numTel,
      restaurantID: req.params.id,
      dateReservation: req.body.dateReservation,
      nombreReservation: req.body.nombreReservation,
      formReponse: req.body.formReponse,
    });

    reservation = await reservation.save();

    //creates a new reservation and saves it.

    //

    restaurant.reservations.push(reservation._id);
    // console.log("restaurant: ", restaurant);
    restaurant.save();
    res.status(200).json({ succes: true, reservation });
    //updates the new reservation in the restaurant document and saves the document
    //and send back the reservation
  } catch (err) {
    res.status(400).json("Erreur de creation de la réservation");
  }
  //creates new reservation, and updates the new reservation
  //in the restaurant document and saves the document.
};

const maj = async (req, res, filter, etat) => {
  //
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //validates the reservation syntax

  //
  let reservation = await Reservation.findOneAndUpdate(
    {
      _id: req.params.id,
      ...filter,
    },
    {
      etat: etat,
    }
  );
  //findes the reservation if the client correspends at the creator of the reservation
  if (!reservation) {
    return res.status(400).json("Erreur de modification de la réservation");
  }
  return res.status(200).json({ success: true, msg: `reservation ${etat} ` });

  //findes, updates and send back the reservation with "Annulée" state
};

exports.updateReservation = async (req, res) => {
  maj(req, res, { restaurantID: req.compte.restaurant }, req.body.etat);
  return res;
};

exports.annulerReservation = async (req, res) => {
  maj(req, res, { clientID: req.compte.clientID }, "Annulée");
  return res;
};

const getter = async (res, filter) => {
  let reservations = await Reservation.find(filter);
  if (!reservations) return res.status(400).json("Aucune reservation");
  return res.status(200).json({ success: true, reservations: reservations });
};

exports.getReservations = async (req, res) => {
  return getter(res, { restaurantID: req.compte.restaurant });
};

exports.getReservationsClient = async (req, res) => {
  return getter(res, { clientID: req.compte.clientID });
};
