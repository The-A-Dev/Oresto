//dependencies
const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
//middlewares
const auth = require("../middleware/auth");
//controllers
const evenementController = require("../controllers/evenement");

router.get("/restaurant/:id", evenementController.getEvenementsIDrestaurant);

router.post(
  "/new",
  [
    auth.gerant,
    body("nom", "Entrer un nom valide").isLength({ min: 4, max: 50 }),
    body("description", "Entrer une description valide").isLength({
      min: 4,
      max: 100,
    }),
  ],
  evenementController.newEvenement
);
// router.put(
//   "/:id/update",
//   [
//     auth.gerant,
//     body("nom", "Entrer un nom valide").isLength({ min: 4, max: 50 }),
//     body("description", "Entrer une description valide").isLength({
//       min: 4,
//       max: 50,
//     }),
//   ],
//   evenementController.updateEvemement
// );
router.delete("/:id/delete", auth.gerant, evenementController.deleteEvenement);

module.exports = router;
