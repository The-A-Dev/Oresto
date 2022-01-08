import React from "react";
import Cookie from "js-cookie";
import {
  Toolbar,
  AppBar,
  Button,
  Box,
  Grid,
  Avatar,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LoginPopUp from "./Login-Signup/LoginPopUp";
import { SET_USER } from "../util/constants";
const useStyles = makeStyles((theme) => ({
  logo: {
    marginBottom: "10px",
    marginTop: "5px",
  },
  toolBar: {
    justifyContent: "space-between",
    margin: "0px 7vw",
  },
  appBar: {
    minHeight: "10vh",
  },
  appBarBg: {
    height: "10vh",
  },
  nomResto: {
    color: theme.palette.primary.main,
  },
  buttons: { marginLeft: "auto" },
  avatar: { backgroundColor: theme.palette.primary.main },
}));

const Header = () => {
  const classes = useStyles();
  const { error, authenticated, userData } = useSelector((state) => state.auth);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const loginClick = () => {
    setPopupOpen(true);
  };

  const handleAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleHomeClick = () => {
    setAnchorEl(null);
    history.push("/");
  };
  const handleSuiviClick = () => {
    setAnchorEl(null);
    history.push("/me");
  };

  const handleDeconnexion = () => {
    Cookie.remove("jwt");
    dispatch({ type: SET_USER, payload: null });
    history.push("/");
    window.location.reload();
  };
  const handleCloseAvatar = () => {
    setAnchorEl(null);
  };
  return (
    <Box style={{ zIndex: "100" }}>
      {/*To Display Errors*/}
      {console.log(error)}
      <Snackbar open={error.openErrorDialog} autoHideDuration={6000}>
        <Alert severity="warning" elevation={6} variant="filled">
          {error.msg}
        </Alert>
      </Snackbar>
      {/* <DialogTitle id="form-dialog-title">Login</DialogTitle> */}
      <AppBar color="inherit" position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolBar}>
          <Grid container justify="space-between" alignItems="center">
            <Grid item>
              <img
                src={process.env.PUBLIC_URL + "/logoSmall.png"} //TODO:Make Svg
                alt="logo"
                width="100px"
                className={classes.logo}
              />
            </Grid>
            <Grid item className={classes.buttons}>
              {!authenticated ? (
                <div>
                  <Button
                    className={classes.button}
                    variant="outlined"
                    color="secondary"
                    onClick={loginClick}
                  >
                    Se connecter / S'inscrire
                  </Button>
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disableElevation
                    component={RouterLink}
                    to="/partenaire"
                  >
                    Devenir partenaire
                  </Button>
                </div>
              ) : (
                <div>
                  <Grid container alignItems="center">
                    <Grid item>
                      <Typography>
                        {userData.nom}
                        {userData.type == "ROLE_GERANT" && (
                          <>
                            ,{" "}
                            <b className={classes.nomResto}>
                              {userData.nomRestaurant}
                            </b>
                          </>
                        )}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button onClick={handleAvatar}>
                        <Avatar className={classes.avatar} />
                      </Button>
                    </Grid>
                  </Grid>
                  <Menu
                    style={{ position: "absolute", top: "6vh" }}
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAvatar}
                  >
                    <MenuItem onClick={handleHomeClick}>
                      {userData.type == "ROLE_CLIENT"
                        ? "Voir la carte"
                        : "Dashboard"}
                    </MenuItem>
                    {userData.type == "ROLE_CLIENT" && (
                      <MenuItem onClick={handleSuiviClick}>Suivi</MenuItem>
                    )}
                    <MenuItem onClick={handleDeconnexion}>Déconnexion</MenuItem>
                  </Menu>
                </div>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <div className={classes.appBarBg}></div>
      <LoginPopUp open={popupOpen} setOpen={setPopupOpen} />
    </Box>
  );
};

export default Header;
