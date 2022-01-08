const express = require("express");
const { body } = require("express-validator");
const auth = require("../middleware/auth");

const gerantController = require("../controllers/gerant");

const router = express.Router();

router.post(
  "/signup",
  [
    body("nom", "Entrer un nom valide")
      .isLength({ min: 5 })
      .isAlpha("en-US", { ignore: " " }),
    body("email", "Entrer un email valide").trim().isEmail(),
    body("motdepasse", "Mot de passe faible").isLength({ min: 5, max: 30 }),
    body("numTel", "Entrer un numéro de téléphone valide").trim().isLength({
      min: 8,
      max: 8,
    }),
    body("type", "Cet utilisateur n'est pas un gerant").equals("ROLE_GERANT"),
    body("age")
      .isInt({ min: 18 })
      .withMessage("Vous etes trop jeune pour etre gerant")
      .isInt({ max: 102 })
      .withMessage("Entrer un age valide"),
    body("restaurant.nom", "Entrer un nom valide").trim().not().isEmpty(),
    body(
      "restaurant.description",
      "La description doit être moins de 255 caractères"
    ).isLength({ max: 255 }),
    body("restaurant.ville", "Entrer une ville valide").not().isEmpty(),
    body("restaurant.tags", "Entrer au moins un tag").not().isEmpty(),
    body("restaurant.urlPhotos", "Soumettre au moins 3 images").isArray({
      min: 3,
    }),
    body(
      "restaurant.coordonnee.lat",
      "Veuillez indiquer la localisation de votre restaurant"
    ).isDecimal(),
    body(
      "restaurant.coordonnee.lng",
      "Veuillez indiquer la localisation de votre restaurant"
    ).isDecimal(),
  ],
  gerantController.newGerant
);

module.exports = router;
