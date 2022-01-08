const express = require("express");
const auth = require("../middleware/auth");
const { body } = require("express-validator");
const router = express.Router();
const restauController = require("../controllers/restaurant");

router.get("/:id", restauController.getRestaurantById);

router.get("/map", restauController.getAllRestaurants);
router.get("/ville/:ville", restauController.getRestaurantsByVille);

router.put(
  "/menu",
  [
    auth.gerant,
    body()
      .isArray({ min: 1, max: 10 })
      .withMessage("Le menu ne peut pas etre vide"),
    body("*.categorie", "Le champs catégorie ne peux pas etre vide")
      .not()
      .isEmpty(),
    body("*.plats", "Veuillez entrer des plats pour chaque catégorie").isArray({
      min: 1,
      max: 70,
    }),
    body("*.plats.*.nomPlat", "Veuillez saisir le nom des plats")
      .not()
      .isEmpty(),
    body("*.plats.*.prixUnitaire", "Veuillez choisir le prix des plats")
      .not()
      .isEmpty(),
  ],
  restauController.majMenu
);

router.put(
  "/form/update",
  [
    auth.gerant,
    body("formReservation", "Le formulaire ne peut pas etre vide").isArray({
      min: 1,
      max: 20,
    }),
    body(
      "formReservation.*.question",
      "Veuillez saisir les questions"
    ).isLength({ min: 4 }),
    body(
      "formReservation.*.reponses",
      "Veuillez saisir des reponses possibles"
    ).isArray({ min: 1, max: 10 }),
    body(
      "formReservation.*.reponses.*",
      "Les reponse ne peuvent pas etre vides"
    ).notEmpty(),
  ],
  restauController.updateFormReservation
);

router.post("/new", restauController.NewRestaurant);

// router.post("/:id/avis/new", [auth.client], restauController.newAvis);

module.exports = router;
