import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Cookie from "js-cookie";
import jwtDecode from "jwt-decode";

import { SET_USER } from "./util/constants";

import React from "react";
//theming
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import themeObject from "./util/theme";

import store from "./store";
import OrestoRoutes from "./routes";

const theme = createMuiTheme(themeObject);

const cookie = Cookie.get("jwt");
if (cookie) {
  const decodedToken = jwtDecode(cookie);
  store.dispatch({ type: SET_USER, payload: decodedToken });
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <OrestoRoutes />
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
