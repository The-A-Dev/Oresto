import axios from "axios";
import Cookie from "js-cookie";
import {
  SET_LOADING_DATA,
  SET_RESTAURANTS_BY_VILLE,
  SET_RESTAURANT_DATA,
  SENDING_AVIS,
  SET_NEW_AVIS,
  GET_GERANTS,
  SET_LOADING_GERANTS,
  SET_INIT,
} from "../../util/constants";

export const mapRestaurantsAction = (ville) => (dispatch) => {
  axios
    .get(`http://localhost:5000/restaurant/ville/${ville}`)
    .then((res) => {
      if (res.data.msg.length === 0) {
        dispatch({ type: SET_INIT });
      } else
        dispatch({ type: SET_RESTAURANTS_BY_VILLE, payload: res.data.msg });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const restaurantDataAction = (id) => (dispatch) => {
  dispatch({ type: SET_LOADING_DATA });
  axios
    .get(`http://localhost:5000/restaurant/${id}`)
    .then((res) => {
      console.log("Restau trouvé avec succes");
      let restaurant = res.data.msg;
      //L'ajout des évènements du modèle évènement
      axios
        .get(`http://localhost:5000/evenement/restaurant/${id}`)
        .then((response) => {
          const evenements = response.data.msg;
          restaurant = { ...restaurant, evenements: evenements };
          //L'ajout des avis du modèle avis
          axios
            .get(`http://localhost:5000/avis/restaurant/${id}`)
            .then((resp) => {
              const avis = resp.data.msg;
              console.log(avis);
              restaurant = { ...restaurant, avis: avis };
              dispatch({ type: SET_RESTAURANT_DATA, payload: restaurant });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const newAvisAction = (id, avis, history) => (dispatch) => {
  dispatch({ type: SENDING_AVIS });
  const token = Cookie.get("jwt");
  axios
    .post(`http://localhost:5000/avis/new/${id}`, avis, {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: SET_NEW_AVIS });
      history.go(0);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getGerantsActions = () => (dispatch) => {
  const token = Cookie.get("jwt");
  dispatch({ type: SET_LOADING_GERANTS });
  axios
    .get("http://localhost:5000/admin/gerant", {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      dispatch({ type: GET_GERANTS, payload: res.data.msg });
    });
};

export const updateEtatGerant = (id, gerants, etat) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .put(
      `http://localhost:5000/admin/gerant/${id}/etat`,
      { etat: etat },
      {
        headers: {
          "x-login-token": token,
        },
      }
    )
    .then((res) => {
      console.log("Update Successful");
      dispatch({ type: GET_GERANTS, payload: gerants });
    })
    .catch((err) => console.log(err));
};
