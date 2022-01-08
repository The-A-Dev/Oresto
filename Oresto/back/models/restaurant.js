const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  //gerantID: { type: mongoose.Schema.Types.ObjectId, ref: "Gerant" }, //Maybe deletable
  //TODO:Add Localisation (lat,long) DONE
  nom: { type: String, required: true },
  description: { type: String },
  coordonnee: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  ville: { type: String, required: true },
  etat: {
    type: String,
    enum: ["En attente", "Actif", "Rejeté"],
    default: "En attente",
  },
  urlPhotos: [String],
  noteMoyenne: { type: Number, default: 0 },
  nbrAvis: { type: Number, default: 0 },
  avis: [{ type: mongoose.Schema.Types.ObjectId, ref: "Avis" }],
  commandes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Commande" }],
  reservations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reservation" }],
  menu: [
    {
      categorie: String,
      plats: [
        {
          nomPlat: String,
          ingredients: [String],
          prixUnitaire: Number,
        },
      ],
    },
  ],
  formReservation: [
    {
      question: String,
      reponses: [String],
    },
  ],
  derniersEvenements: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Evenement" },
  ],
  tags: [String],
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
module.exports = Restaurant;
