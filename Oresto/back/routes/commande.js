const commandeController = require("../controllers/commande");
const auth = require("../middleware/auth");

const { body } = require("express-validator");

const express = require("express");

const router = express.Router();
// const clientController = require("../controllers/client");
// const { post } = require("./restaurant");

router.post(
  "/new",
  [
    auth.client,
    body("platsCommande", "Ajouter au moins un plat").isArray({
      min: 1,
      max: 20,
    }),
    body(
      "platsCommande.*.nombreUnite",
      "Veuillez saisir le nombre de chaque plat"
    ).isInt({ min: 1, max: 256 }),
    body("platsCommande.*.platID", "platID ne peux pas etre vide").notEmpty(),
  ],
  commandeController.passerCommande
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
  commandeController.updateCommande
);
router.put("/:id/annuler", auth.client, commandeController.annulerCommande);

router.get("/gerant/get", auth.gerant, commandeController.getCommandesGerant);
router.get("/client/get", auth.client, commandeController.getCommandesClient);

module.exports = router;
