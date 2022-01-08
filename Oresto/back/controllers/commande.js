const { validationResult } = require("express-validator");

const Restaurant = require("../models/restaurant");
const Commande = require("../models/commande");

exports.passerCommande = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const platsCommande = req.body.platsCommande;
    const restaurant = await Restaurant.findById(req.body.restaurantID);
    if (!restaurant)
      return res.status(400).send("Pas de restaurant avec cet ID");
    let prixCommande = 0,
      arrayCommandes = [];
    //chercher les données de chaque plat (prix,nom..)
    //au lieu de les envoyer dans l'objet body pour plus de securité
    platsCommande.map((platCommande) => {
      restaurant.menu.map((categorie) => {
        //chercher dans les listes des plats si les plats choisis correspondent au menu
        categorie.plats.map((platRestau) => {
          if (platRestau._id == platCommande.platID) {
            arrayCommandes.push({
              platID: platRestau._id, // maybe deletable
              nomPlat: platRestau.nomPlat,
              prixUnitaire: platRestau.prixUnitaire,
              nombreUnite: platCommande.nombreUnite,
            });
            prixCommande += platRestau.prixUnitaire * platCommande.nombreUnite;
          }
        });
      });
    });
    if (arrayCommandes.length == 0) {
      return res.status(400).send("Veuillez choisir des plats valides");
    }
    //console.log(arrayCommandes);
    //Ajouter la commande
    let commande = new Commande({
      clientID: req.compte.clientID,
      restaurantID: req.body.restaurantID,
      nom: req.compte.nom,
      nomRestaurant: restaurant.nom,
      numTel: req.compte.contact.numTel,
      platsCommande: arrayCommandes,
      prix: prixCommande,
    });
    commande = await commande.save();
    //Maj du tableau des commandes dans le restaurant
    restaurant.commandes.push(commande);
    await restaurant.save();
    res.status(201).send({ success: true, msg: commande });
  } catch (err) {
    res.status(400).send("Erreur...");
  }
};

const maj = async (req, res, filter, etat) => {
  //
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  //validates the reservation syntax
  try {
    //
    let commande = await Commande.findOneAndUpdate(
      {
        _id: req.params.id,
        ...filter,
      },
      {
        etat: etat,
      }
    );
    //finds commande if the client matches the creator or the owner of the restaurant of commande
    if (!commande) {
      return res
        .status(400)
        .json("Erreur de modification: commande inexistante");
    }
    return res.status(200).json({ success: true, msg: `Commande ${etat} ` });
  } catch (err) {
    return res.status(400).json("Erreur de modification de la commande");
  }

  //finds, updates and sends back commande with "whatever" state is in the "etat" param
  //with a filter in the "filter" param
};

exports.updateCommande = async (req, res) => {
  return maj(req, res, { restaurantID: req.compte.restaurant }, req.body.etat);
};

exports.annulerCommande = async (req, res) => {
  return maj(req, res, { clientID: req.compte.clientID }, "Annulée");
};

const getter = async (res, filter) => {
  let commandes = await Commande.find(filter);
  // console.log(commandes);
  if (!commandes) return res.status(400).json("Aucune commande");
  return res.status(200).json({ success: true, msg: commandes });
};

exports.getCommandesGerant = async (req, res) => {
  return getter(res, { restaurantID: req.compte.restaurant });
};
exports.getCommandesClient = async (req, res) => {
  return getter(res, { clientID: req.compte.clientID });
};
