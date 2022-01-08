import axios from "axios";
import Cookie from "js-cookie";
import {
  GET_COMMANDES_CLIENT,
  SET_LOADING_COMMANDE,
  GET_RESERVATION_CLIENT,
  SET_AVIS_CLIENT,
} from "../../util/constants";

export const getClientCommandesAction = () => (dispatch) => {
  const token = Cookie.get("jwt");
  dispatch({ type: SET_LOADING_COMMANDE });
  axios
    .get("http://localhost:5000/commande/client/get", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: GET_COMMANDES_CLIENT, payload: res.data.msg });
    })
    .catch((err) => console.log(err));
};

export const newCommandeAction =
  (commandes, restaurantID, history) => (dispatch) => {
    const token = Cookie.get("jwt");
    axios
      .post(
        "http://localhost:5000/commande/new",
        { ...commandes, restaurantID: restaurantID },
        {
          headers: {
            "x-login-token": token,
          },
        }
      )
      .then((res) => {
        console.log("Commande réaliséee avec succés");
        history.push("/me");
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const annulerCommandeAction = (commandeID, commandes) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .put(
      `http://localhost:5000/commande/${commandeID}/annuler`,
      {},
      {
        headers: {
          "x-login-token": token,
        },
      }
    )
    .then((res) => {
      console.log("Commande annulée");
      dispatch({ type: GET_COMMANDES_CLIENT, payload: commandes });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getClientReservationAction = () => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .get("http://localhost:5000/reservation/client/get", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({
        type: GET_RESERVATION_CLIENT,
        payload: res.data.reservations,
      });
    })
    .catch((err) => console.log(err));
};

export const annulerReservationAction =
  (reservationID, reservations) => (dispatch) => {
    const token = Cookie.get("jwt");
    axios
      .put(
        `http://localhost:5000/reservation/${reservationID}/annuler`,
        {},
        {
          headers: {
            "x-login-token": token,
          },
        }
      )
      .then((res) => {
        console.log("Reservation annulée");
        dispatch({ type: GET_RESERVATION_CLIENT, payload: reservations });
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getClientAvisAction = () => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .get("http://localhost:5000/avis/client", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: SET_AVIS_CLIENT, payload: res.data.msg });
      console.log("GET Avis successful");
    })
    .catch((err) => console.log(err));
};

export const avisDeleteAction = (avis, setAvis, id) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .delete(`http://localhost:5000/avis/${id}/delete`, {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      const newAvis = avis.filter((element) => {
        return element._id !== id;
      });
      console.log(newAvis);
      dispatch({ type: SET_AVIS_CLIENT, payload: newAvis });
      setAvis(newAvis);
      console.log("DELETE Avis successful");
    })
    .catch((err) => console.log(err));
};
