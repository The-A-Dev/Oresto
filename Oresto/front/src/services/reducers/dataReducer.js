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

const initialState = {
  loading: false,
  loadingAvis: false,
  searchedRestaurants: [],
  mapCenter: {
    lat: 36.80691236510967,
    lng: 10.183186,
  },
  restoData: {
    tags: [],
    nom: "",
    description: "",
    evenements: [],
    ville: "",
    urlPhotos: [],
    noteMoyenne: 0,
    nbrAvis: 0,
    formReservation: [],
    avis: [],
    menu: [],
  },
  gerantData: [],
  loadingGerants: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_RESTAURANTS_BY_VILLE:
      return {
        ...state,
        loading: false,
        searchedRestaurants: action.payload,
        mapCenter: action.payload[0].coordonnee,
      };
    case SET_INIT:
      return initialState;
    case SET_LOADING_DATA:
      return { ...state, loading: true };
    case SET_RESTAURANT_DATA:
      return { ...state, loading: false, restoData: action.payload };
    case SENDING_AVIS:
      return { ...state, loadingAvis: true };
    case SET_NEW_AVIS:
      return { ...state, loadingAvis: false };
    case SET_LOADING_GERANTS:
      return { ...state, loadingGerants: true };
    case GET_GERANTS:
      return { ...state, loadingGerants: false, gerantData: action.payload };
    default:
      return state;
  }
}
