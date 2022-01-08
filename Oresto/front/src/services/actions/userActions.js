import axios from "axios";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";
import {
  SET_USER,
  SET_ERROR,
  SET_LOADING_USER,
  CLEAR_ERRORS,
} from "../../util/constants";

export const loginAction = (inputs) => (dispatch) => {
  console.log("loginAction called");
  dispatch({ type: SET_LOADING_USER });
  axios
    .post("http://localhost:5000/auth", inputs)
    .then((res) => {
      logUser(res, dispatch);
    })
    .catch((err) => {
      displayErrors(err, dispatch);
    });
};

export const clientSignUpAction = (inputs) => (dispatch) => {
  console.log("clientSignUpAction called");
  dispatch({ type: SET_LOADING_USER });

  axios
    .post("http://localhost:5000/client/signup", {
      ...inputs,
      nom: inputs.prenom + " " + inputs.nom,
    })
    .then((res) => {
      logUser(res, dispatch);
    })
    .catch((err) => {
      displayErrors(err, dispatch);
    });
};

export const gerantSignUpAction =
  (inputs, setActiveStep, activeStep) => (dispatch) => {
    console.log("gerantSignUpAction called");
    dispatch({ type: SET_LOADING_USER });
    axios
      .post("http://localhost:5000/gerant/signup", inputs)
      .then((res) => {
        //Pour Ne pas laisser le gerant se connecter tant qu'il n'a pas été confirmé
        //logUser(res, dispatch);
        dispatch({ type: CLEAR_ERRORS });
        setActiveStep(activeStep + 1);
      })
      .catch((err) => {
        displayErrors(err, dispatch);
      });
  };

const logUser = (res, dispatch) => {
  Cookie.set("jwt", res.headers["x-login-token"]);
  const decodedToken = jwtDecode(res.headers["x-login-token"]);
  dispatch({ type: SET_USER, payload: decodedToken });
  console.log("User logged: ", res.data);
  console.log("Token: ", Cookie.get("jwt"));
  dispatch({ type: CLEAR_ERRORS });
  // setDialogOpen(false);
  //set
};

const displayErrors = (err, dispatch) => {
  console.log("It's an arror");
  let error = err.response.data;
  if (typeof error === "string") {
    console.log(error);
  } else if (Array.isArray(error)) {
    console.log("And it's an array");
    console.log(error[0].msg);
    error = error[0].msg;
  }
  error = { openErrorDialog: true, msg: error };
  dispatch({ type: SET_ERROR, payload: error });
  setTimeout(() => {
    error.openErrorDialog = false;
    dispatch({ type: SET_ERROR, payload: error });
  }, 4000);
  //Update (dispatch) errors
};
export const reserverAction = (formData, id, history) => (dispatch) => {
  const token = Cookie.get("jwt");
  axios
    .post(`http://localhost:5000/reservation/${id}/new`, formData, {
      headers: {
        "x-login-token": token,
      },
    })
    .then((res) => {
      history.push("/me");
      console.log("Form sent");
    })
    .catch((err) => {
      history.goBack();
      console.log(err);
    });
};
