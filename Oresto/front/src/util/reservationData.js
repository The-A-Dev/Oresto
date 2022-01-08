const reservationData = [
  {
    clientID: "1",
    clientName: "premier",
    clientTel: 21546554,
    restaurantID: "01",
    dateCreation: "01/01/2001",
    dateReservation: "10/10/2010",
    etat: "En cours",

    nombreReservation: 1,
    formReponse: [
      {
        question: "question1",
        reponse: "reponse1",
      },
      {
        question: "question2",
        reponse: "reponse2",
      },
      {
        question: "question3",
        reponse: "reponse3",
      },
    ],
  },
  {
    clientID: "2",
    restaurantID: "02",
    clientName: "deux",
    clientTel: 54563214,
    dateCreation: "02/02/2002",
    dateReservation: "20/20/2020",
    etat: "Confirmée",

    nombreReservation: 2,
    formReponse: [
      {
        question: "question1",
        reponse: "reponse1",
      },
      {
        question: "question2",
        reponse: "reponse2",
      },
      {
        question: "question3",
        reponse: "reponse3",
      },
    ],
  },
  {
    clientID: "3",
    clientName: "trois",
    clientTel: 45698575,
    restaurantID: "03",
    dateCreation: "03/03/2003",
    dateReservation: "30/30/2030",
    etat: "Annulée",

    nombreReservation: 3,
    formReponse: [
      {
        question: "question1",
        reponse: "reponse1",
      },
      {
        question: "question2",
        reponse: "reponse2",
      },
      {
        question: "question3",
        reponse: "reponse3",
      },
    ],
  },
];

export default reservationData;
