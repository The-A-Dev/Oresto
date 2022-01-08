//dependencies
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
//middlewares
const auth = require("../middleware/auth");
//controlers
//const restauController = require("../controllers/restaurant");
const reservationController = require("../controllers/reservation");

router.post(
  "/:id/new",
  [
    auth.client,
    body(
      "dateReservation",
      "Entrer une date de reservation valide"
    ).isISO8601(),
    body("nombreReservation", "Entrer un nombre de personnes valide").isInt({
      min: 1,
      max: 50,
    }),
    body("formReponse", "Veuillez repondre aux questions").isArray({
      min: 1,
      max: 20,
    }),
    body(
      "formReponse.*.reponse",
      "Le champs reponse ne peut pas etre vide"
    ).notEmpty(),
    body(
      "formReponse.*.question",
      "Le champs question ne peut pas etre vide "
    ).notEmpty(),
  ],
  reservationController.newReservation
);

router.put(
  "/:id/annuler",
  //?what rout shoud i use here since i dont think i need to use the restaurant id,
  //?can i simply use the reservation id in the router instead of the restaurant id
  //* done resolved
  auth.client,
  reservationController.annulerReservation
);

router.put(
  "/:id/update",
  [
    auth.gerant,
    body("etat", "Entrer un etat valide").isIn([
      "Terminée",
      "Refusée",
      "Confirmée",
    ]),
  ],
  reservationController.updateReservation
);

router.get("/gerant/get", auth.gerant, reservationController.getReservations);
router.get(
  "/client/get",
  auth.client,
  reservationController.getReservationsClient
);

module.exports = router;
