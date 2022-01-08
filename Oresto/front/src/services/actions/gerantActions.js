import axios from "axios";
import Cookie from "js-cookie";
import {
  GET_COMMANDES_GERANT,
  SET_LOADING_COMMANDE,
  GET_RESERVATIONS_GERANT,
  GET_FORM_DATA,
  SET_AVIS_GERANT,
  SET_LOADING_EVENTS,
  NEW_EVENT_GERANT,
  SET_EVENTS_GERANT,
  SET_MENU_GERANT,
} from "../../util/constants";

export const getCommandesGerantAction = () => (dispatch) => {
  const token = Cookie.get("jwt");
  dispatch({ type: SET_LOADING_COMMANDE });
  //   console.log(token);
  axios
    .get("http://localhost:5000/commande/gerant/get", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      //   console.log(res.data);
      dispatch({ type: GET_COMMANDES_GERANT, payload: res.data.msg });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getReservationsGerantAction = () => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .get("http://localhost:5000/reservation/gerant/get", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_RESERVATIONS_GERANT,
        payload: res.data.reservations,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateCommandeGerantAction = (commandeID, etat) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .put(
      `http://localhost:5000/commande/${commandeID}/update`,
      { etat: etat },
      {
        headers: {
          "x-login-token": token,
        },
      }
    )
    .then((res) => {
      console.log(res.data.msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
export const updateReservationGerantAction =
  (reservationID, etat) => (dispatch) => {
    const token = Cookie.get("jwt");
    axios
      .put(
        `http://localhost:5000/reservation/${reservationID}/update`,
        { etat: etat },
        {
          headers: {
            "x-login-token": token,
          },
        }
      )
      .then((res) => {
        console.log(res.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };

export const getFormReservationAction = (id) => (dispatch) => {
  axios
    .get(`http://localhost:5000/restaurant/${id}`)
    .then((res) => {
      console.log(res.data.msg);
      dispatch({
        type: GET_FORM_DATA,
        payload: res.data.msg.formReservation,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateFormReservationAction = (value) => (dispatch) => {
  const token = Cookie.get("jwt");
  console.log(value);
  axios
    .put(
      "http://localhost:5000/restaurant/form/update",
      {
        formReservation: value,
      },
      {
        headers: {
          "x-login-token": token,
        },
      }
    )
    .then((res) => {
      dispatch({ type: GET_FORM_DATA, payload: value });
      console.log("Form updated");
    })
    .catch((err) => {
      console.log(err);
    });
};
export const getAvisGerantAction = (id) => (dispatch) => {
  axios
    .get(`http://localhost:5000/avis/restaurant/${id}`)
    .then((resp) => {
      const avis = resp.data.msg;
      console.log(avis);
      dispatch({ type: SET_AVIS_GERANT, payload: avis });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newEventAction = (event) => (dispatch) => {
  const token = Cookie.get("jwt");
  dispatch({ type: SET_LOADING_EVENTS });
  axios
    .post("http://localhost:5000/evenement/new", event, {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: NEW_EVENT_GERANT, payload: res.data.msg });
    })
    .catch((err) => console.log(err));
};

export const getEventsGerantAction = (id) => (dispatch) => {
  axios
    .get(`http://localhost:5000/evenement/restaurant/${id}`)
    .then((response) => {
      const evenements = response.data.msg;
      dispatch({ type: SET_EVENTS_GERANT, payload: evenements });
    })
    .catch((err) => console.log(err));
};

export const deleteEventAction = (id, newEvents) => (dispatch) => {
  const token = Cookie.get("jwt");
  dispatch({ type: SET_LOADING_EVENTS });
  axios
    .delete(`http://localhost:5000/evenement/${id}/delete`, {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: SET_EVENTS_GERANT, payload: newEvents });
      console.log(res.data.msg);
    })
    .catch((err) => console.log(err));
};

export const updateMenuAction = (menu) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .put("http://localhost:5000/restaurant/menu", menu, {
      headers: { "x-login-token": token },
    })
    .then((res) => {
      console.log("Menu mis a jour avec succes");
      dispatch({ type: SET_MENU_GERANT, payload: menu });
    })
    .catch((err) => console.log(err));
};
export const getMenuGerantAction = (id) => (dispatch) => {
  axios
    .get(`http://localhost:5000/restaurant/${id}`)
    .then((res) => {
      dispatch({
        type: SET_MENU_GERANT,
        payload: res.data.msg.menu,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
