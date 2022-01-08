const mongoose = require("mongoose");

const gerantSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nomRestaurant: {
    type: String,
  },
  numTel: {
    type: String,
    required: true,
  },
  etat: {
    type: String,
    enum: ["En attente", "Actif", "Rejeté"],
    default: "En attente",
  },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Restaurant",
  },
  compte: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Compte",
  },
});

const Gerant = mongoose.model("Gerant", gerantSchema);
module.exports = Gerant;
