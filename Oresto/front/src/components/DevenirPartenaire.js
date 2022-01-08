import React from "react";
import Alert from "@material-ui/lab/Alert";
import {
  CssBaseline,
  Snackbar,
  Paper,
  Stepper,
  Step,
  StepLabel,
  Button,
  Link,
  Typography,
  makeStyles,
} from "@material-ui/core";

import SignUpGerant from "./SignUpGerant";
import RestaurantForm from "./RestaurantForm";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { gerantSignUpAction } from "../services/actions/userActions";
import Appbar from "./Appbar";

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
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ["Données personnelles", "Détails du réstaurant"];

function getStepContent(step, values, setValues) {
  switch (step) {
    case 0:
      return <SignUpGerant values={values} setValues={setValues} />;
    case 1:
      return <RestaurantForm values={values} setValues={setValues} />;
    default:
      throw new Error("Unknown step");
  }
}

export default function DevenirPartenaire() {
  const { loading, error } = useSelector((state) => state.auth);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = React.useState({
    nom: "",
    prenom: "",
    age: 18,
    numTel: "",
    email: "",
    motdepasse: "",
    nomRestaurant: "",
    description: "",
    ville: "",
    tags: [],
    imgUrls: [],
    coordonnee: {},
  });

  const dispatch = useDispatch();
  const handleSubmit = () => {
    const gerant = {
      nom: values.prenom + " " + values.nom,
      age: values.age,
      email: values.email,
      motdepasse: values.motdepasse,
      numTel: values.numTel,
      type: "ROLE_GERANT",
      restaurant: {
        nom: values.nomRestaurant,
        description: values.description,
        ville: values.ville,
        urlPhotos: values.imgUrls,
        tags: values.tags,
        coordonnee: values.coordonnee,
      },
    };

    dispatch(gerantSignUpAction(gerant, setActiveStep, activeStep));

    //send values to server
    console.log("Data sent to server..", gerant);
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Appbar title="Devenir partenaire" />
      {/*To Display Errors*/}
      {console.log(error)}
      <Snackbar open={error.openErrorDialog} autoHideDuration={6000}>
        <Alert severity="warning" elevation={6} variant="filled">
          {error.msg}
        </Alert>
      </Snackbar>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Bienvenue à bord
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Merci pour votre confiance.
                </Typography>
                <Typography variant="subtitle1">
                  L'un de nos agents va vous contacter prochainement sur votre
                  téléphone pour la confirmation de votre compte.
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  component={RouterLink}
                  to="/"
                  style={{ marginTop: "5px" }}
                >
                  Retourner à l'accueil
                </Button>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, values, setValues)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Retour
                    </Button>
                  )}
                  {activeStep === steps.length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleSubmit}
                      className={classes.button}
                      disableElevation
                      disabled={loading}
                    >
                      S'inscrire
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                      disableElevation
                      disabled={loading}
                    >
                      Suivant
                    </Button>
                  )}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
