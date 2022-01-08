const express = require("express");
const auth = require("../middleware/auth");
const { body } = require("express-validator");
const router = express.Router();
const avisController = require("../controllers/avis");

//const restauController = require("../controllers/restaurant");

router.post(
  "/new/:id",
  [
    auth.client,
    body("commentaire", "Entrer un commentaire valide").isLength({
      min: 2,
      max: 1024,
    }),
    body("nombreEtoile", "Nombre d'etoiles invalide").isInt({ min: 1, max: 5 }),
  ],
  avisController.newAvis
);

router.delete("/:id/delete", auth.client, avisController.deleteAvis);

router.get("/restaurant/:id", avisController.getAvisIDrestaurant); //gets all the avis related to a given restaurant
router.get("/client", auth.client, avisController.getAvisIDclient); //gets all the avis relates to a given client

module.exports = router;
