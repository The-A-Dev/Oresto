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

const initialState = {
  loadingCommande: false,
  loadingEvents: false,
  commandes: [],
  reservations: [],
  formReservation: [],
  events: [],
  avis: [],
  menu: [],
  formUpdateLoading: false,
};

export default function gerantReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMANDES_GERANT:
      return { ...state, loadingCommande: false, commandes: action.payload };
    case SET_LOADING_COMMANDE:
      return { ...state, loadingCommande: true };
    case GET_RESERVATIONS_GERANT:
      return { ...state, reservations: action.payload };
    case GET_FORM_DATA:
      return { ...state, formReservation: action.payload };
    case SET_AVIS_GERANT:
      return { ...state, avis: action.payload };
    case SET_LOADING_EVENTS:
      return { ...state, loadingEvents: true };
    case NEW_EVENT_GERANT:
      return { ...state, events: [...state.events, action.payload] };
    case SET_EVENTS_GERANT:
      return { ...state, events: action.payload };
    case SET_MENU_GERANT:
      return { ...state, menu: action.payload };
    default:
      return state;
  }
}
