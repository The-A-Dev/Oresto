import {
  GET_COMMANDES_CLIENT,
  SET_LOADING_COMMANDE,
  GET_RESERVATION_CLIENT,
  SET_AVIS_CLIENT,
} from "../../util/constants";

const initialState = {
  commandes: [],
  reservations: [],
  avis: [],
  loadingCommandes: false,
};

export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMANDES_CLIENT:
      return { ...state, loadingCommandes: false, commandes: action.payload };
    case SET_LOADING_COMMANDE:
      return { ...state, loadingCommandes: true };
    case GET_RESERVATION_CLIENT:
      return { ...state, reservations: action.payload };
    case SET_AVIS_CLIENT:
      return { ...state, avis: action.payload };
    default:
      return state;
  }
}
