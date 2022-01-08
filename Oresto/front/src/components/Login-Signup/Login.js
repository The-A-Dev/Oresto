import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { useDispatch, useSelector } from "react-redux";

import { loginAction } from "../../services/actions/userActions";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="/">
        Oresto
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login({ setSignUpUI }) {
  const { loading } = useSelector((state) => state.auth);

  const [inputs, setInputs] = React.useState({ email: "", motdepasse: "" });

  const classes = useStyles();
  const setSignUp = () => {
    setSignUpUI(true);
  };

  const dispatch = useDispatch();

  const handleChange = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    dispatch(loginAction(inputs));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img
          src={process.env.PUBLIC_URL + "/logoSmall.png"} //TODO:Make Svg
          alt="logo"
          width="200px"
        />
        {/* <Typography component="h1" variant="h5">
          Profiter de la joie
        </Typography> */}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            onChange={handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="motdepasse"
            label="Mot de passe"
            type="password"
            id="password"
            onChange={handleChange}
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
            disabled={loading}
          >
            Se connecter
          </Button>
        </form>
        <Grid container>
          <Grid item>
            <Link component="button" onClick={setSignUp} variant="body2">
              {"Vous n'avez pas un compte? Inscrivez-vous"}
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>       
    </Container>
  );
}
