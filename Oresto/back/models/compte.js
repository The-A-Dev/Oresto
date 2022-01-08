const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("config");

const compteSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  motdepasse: { type: String, required: true },
  type: {
    type: String,
    enum: ["ROLE_GERANT", "ROLE_CLIENT", "ROLE_ADMIN"],
    required: true,
  },
});

compteSchema.methods.generateAuthToken = function (obj) {
  console.log("Generating token, obj=", obj);
  const token = jwt.sign(
    { _id: this._id, type: this.type, ...obj },
    config.get("jwtPrivateKey")
  );
  return token;
};

const Compte = mongoose.model("Compte", compteSchema);
module.exports = Compte;
