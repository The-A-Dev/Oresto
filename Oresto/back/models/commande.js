const mongoose = require("mongoose");

const commandeSchema = new mongoose.Schema({
  clientID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Client",
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
    ref: "Restaurant",
  },

  dateCreation: {
    type: Date,
    default: Date.now,
  },
  etat: {
    type: String,
    enum: ["En cours", "Confirmée", "Annulée", "Terminée", "Refusée"],
    default: "En cours",
  },
  platsCommande: [
    {
      platID: { type: mongoose.Schema.ObjectId, required: true },
      nomPlat: String,
      prixUnitaire: Number,
      nombreUnite: Number,
    },
  ],
  prix: {
    type: Number,
    required: true,
  },
});
commandeSchema.methods.calculPrix = function () {};
const Commande = mongoose.model("Commande", commandeSchema);
module.exports = Commande;
