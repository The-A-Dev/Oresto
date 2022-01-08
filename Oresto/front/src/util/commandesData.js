const commandesData = [
  {
    id: "1",
    clientID: "01",
    clientName: "Burger House",
    clientTel: 21546554,
    restaurantID: "001",

    dateCreation: "1/1/2001",
    etat: "En cours",
    platsCommande: [
      {
        platID: "001",
        nomPlat: "Smokey Buns",
        prixUnitaire: 1,
        nombreUnite: 1,
      },
      {
        platID: "002",
        nomPlat: "Salade",
        prixUnitaire: 2,
        nombreUnite: 2,
      },
      {
        platID: "003",
        nomPlat: "Soda",
        prixUnitaire: 3,
        nombreUnite: 3,
      },
    ],
    prix: 10,
  },
  {
    id: "2",
    clientID: "02",
    clientName: "Pizza Cold",
    clientTel: 54563214,
    restaurantID: "002",

    dateCreation: "2/2/2002",
    etat: "Terminée",
    platsCommande: [
      {
        platID: "011",
        nomPlat: "Pepperoni",
        prixUnitaire: 1,
        nombreUnite: 1,
      },
      {
        platID: "012",
        nomPlat: "Left overs",
        prixUnitaire: 2,
        nombreUnite: 2,
      },
      {
        platID: "0013",
        nomPlat: "Salade",
        prixUnitaire: 3,
        nombreUnite: 3,
      },
    ],
    prix: 20,
  },
  // {
  //   id: "3",
  //   clientID: "03",
  //   clientName: "Mounir",
  //   clientTel: 45698575,
  //   restaurantID: "003",

  //   dateCreation: "3/3/2003",
  //   etat: "Refusée",
  //   platsCommande: [
  //     {
  //       platID: "021",
  //       nomPlat: "citron1",
  //       prixUnitaire: 1,
  //       nombreUnite: 1,
  //     },
  //     {
  //       platID: "022",
  //       nomPlat: "citron2",
  //       prixUnitaire: 2,
  //       nombreUnite: 2,
  //     },
  //     {
  //       platID: "023",
  //       nomPlat: "citron3",
  //       prixUnitaire: 3,
  //       nombreUnite: 3,
  //     },
  //   ],
  //   prix: 30,
  // },
];

export default commandesData;
