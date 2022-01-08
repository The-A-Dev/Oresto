import {
  SET_USER,
  SET_AUTHENTICATED,
  SET_LOADING_USER,
  SET_ERROR,
  CLEAR_ERRORS,
} from "../../util/constants";

const initialState = {
  authenticated: false,
  loading: false,
  userData: {},
  error: {
    openErrorDialog: false,
    msg: "",
  },
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        loading: false,
        userData: { ...action.payload },
      };
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loading: false,
        error: initialState.error,
      };
    default:
      return state;
  }
}
