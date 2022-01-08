const express = require("express");
const { body } = require("express-validator");
const clientController = require("../controllers/client");

const router = express.Router();

router.post(
  "/signup",
  [
    body("email", "Entrer un email valide").isEmail(),
    body("nom", "Entrer un nom valide")
      .isLength({ min: 5 })
      .isAlpha("en-US", { ignore: " " }),
    body("motdepasse", "Mot de passe faible").isLength({ min: 5, max: 30 }),
    body("numTel", "Entrer un numéro de téléphone valide").isLength({
      min: 8,
      max: 8,
    }),
    body("type", "Cet utilisateur n'est pas un client").equals("ROLE_CLIENT"),
    body("age")
      .isInt({ min: 13 })
      .withMessage("Vous etes trop jeune")
      .isInt({ max: 102 })
      .withMessage("Entrer un age valide"),
  ],
  clientController.newClient
);

router.get(""); // gets all client that have given a 'etat'

module.exports = router;
