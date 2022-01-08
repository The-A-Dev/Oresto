const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  nomRestaurant: {
    type: String,
    required: true,
  },
  numTel: {
    type: String,
    required: true,
  },
  restaurantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Compte",
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  dateReservation: {
    type: Date,
    required: true,
  },
  etat: {
    type: String,
    enum: ["En cours", "Confirmée", "Annulée", "Terminée", "Refusée"],
    default: "En cours",
  },
  nombreReservation: {
    type: Number,
    required: true,
  },
  formReponse: [
    {
      question: String,
      reponse: String,
    },
  ],
});

const Reservation = mongoose.model("Reservation", reservationSchema);
module.exports = Reservation;
