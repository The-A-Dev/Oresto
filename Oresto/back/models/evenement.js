const mongoose = require("mongoose");

const evenementSchema = new mongoose.Schema({
  restaurantID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  dateCreation: {
    type: Date,
    default: Date.now,
  },
  imgUrl: {
    type: String,
  },
  nom: {
    type: String,
    required: true,
  },

  dateEvenement: {
    type: Date,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },
});

const Evenement = mongoose.model("Evenement", evenementSchema);
module.exports = Evenement;
