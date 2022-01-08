import { combineReducers, createStore, applyMiddleware } from "redux";
import userReducer from "./services/reducers/userReducer";
import dataReducer from "./services/reducers/dataReducer";
import gerantReducer from "./services/reducers/gerantReducer";
import clientReducer from "./services/reducers/clientReducer";
import thunk from "redux-thunk";

const initialState = {};

const reducers = combineReducers({
  auth: userReducer,
  data: dataReducer,
  gerant: gerantReducer,
  client: clientReducer,
});

const store = createStore(reducers, initialState, applyMiddleware(thunk));

export default store;
