const mongoose = require("mongoose");

const avisSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  restaurantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Compte",
  },
  nomAuteur: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  nombreEtoile: {
    type: Number,
  },
  commentaire: {
    type: String,
    required: true,
  },
});

const Avis = mongoose.model("Avis", avisSchema);
module.exports = Avis;
