const mongoose = require("mongoose");

const coordonneLivraison = {
  //TODO:Validation of this data

  numTel: { type: String, required: true },
};

const clientSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    //minimum age required
  },
  contact: coordonneLivraison,
  compte: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Compte",
  },
  avisRedige: [mongoose.Schema.Types.ObjectId],
});

const Client = mongoose.model("Client", clientSchema);
module.exports = Client;
