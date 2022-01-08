import React from "react";
import {
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
  makeStyles,
  MenuItem,
} from "@material-ui/core";

import { ages } from "../../util/variables";
import { clientSignUpAction } from "../../services/actions/userActions";

import { useDispatch, useSelector } from "react-redux";

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const { loading } = useSelector((state) => state.auth);

  const [inputs, setInputs] = React.useState({
    email: "",
    motdepasse: "",
    nom: "",
    prenom: "",
    age: 18,
    numTel: "",
    type: "ROLE_CLIENT",
  });

  const classes = useStyles();

  const [age, setAge] = React.useState(18);

  const dispatch = useDispatch();

  const handleChange = (event) => {
    if (event.target.name === "age") {
      setAge(event.target.value);
    }
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    dispatch(clientSignUpAction(inputs));
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {console.log(inputs)}
      <div className={classes.paper}>
        <img
          src={process.env.PUBLIC_URL + "/logoSmall.png"} //TODO:Make Svg
          alt="logo"
          width="150px"
        />
        {/* <Typography component="h1" variant="h5">
          Inscription
        </Typography> */}
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="prenom"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Prénom"
                onChange={handleChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Nom"
                name="nom"
                autoComplete="lname"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                variant="outlined"
                select
                required
                fullWidth
                onChange={handleChange}
                value={age}
                id="age"
                label="Age"
                name="age"
                // autoComplete="age"
              >
                {ages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={9}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="numtel"
                label="Téléphone"
                name="numTel"
                onChange={handleChange}
                // autoComplete="age"
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="motdepasse"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="J'accèpte les termes du contrat"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disableElevation
            disabled={loading}
          >
            S'inscrire
          </Button>
        </form>
      </div>
      <Box mt={0}>
        <Copyright />
      </Box>
    </Container>
  );
}
