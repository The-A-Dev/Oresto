import { React, useState } from "react";

import { Scrollbars } from "react-custom-scrollbars";
import SwipeableViews from "react-swipeable-views";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
//! el redux: first check if the state confirmed is true,
//!then use the event state to added event state to update
//! the data base
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  makeStyles,
  MobileStepper,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Grid,
  TextField,
  CircularProgress,
} from "@material-ui/core";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch } from "react-redux";

import {
  newEventAction,
  deleteEventAction,
} from "../services/actions/gerantActions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "40rem",
    position: "relative",
    left: "2vw",
  },
  header: {},
  date: {},
  image: {
    height: "30vw",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  description: {
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
}));

const EventsGerant = ({ eventsData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [events, setEvents] = useState([...eventsData]);
  const [imgLoading, setImgLoad] = useState(false);
  const [titre, setTitre] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [imageUrl, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [confirmer, setConfirmer] = useState(false);
  const [ajout, setAjout] = useState(false);

  const dispatch = useDispatch();

  const classes = useStyles();
  const maxSteps = events.length;

  const handleDelete = () => {
    let array = [...events];
    console.log(activeStep);
    array.splice(activeStep, 1);
    //Update client
    setEvents([...array]);
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }

    dispatch(deleteEventAction(eventsData[activeStep]._id, array));
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleUpload = async (event) => {
    if (event.target.files[0]) {
      const data = new FormData();
      data.append("file", event.target.files[0]);
      data.append("upload_preset", "restaurant");
      setImgLoad(true);
      const res = await fetch(process.env.REACT_APP_CLOUD, {
        method: "POST",
        body: data,
      });

      const file = await res.json();

      setImage(file.secure_url);
      setImgLoad(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTitre = (event) => {
    setTitre(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleConfirmer = () => {
    let x = {
      nom: titre,
      dateEvenement: new Date(selectedDate).toISOString(),
      imgUrl: imageUrl,
      description: description,
    };
    // setAddedEvent({ ...x });
    dispatch(newEventAction(x));
    setEvents((prev) => [...prev, x]);
    // console.log(events);
    setAjout(false);
    // setConfirmer(true);
  };
  const handleAjout = () => {
    setAjout(true);
  };
  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        {events.length > 0 ? (
          <Card variant="outlined" className={classes.root}>
            <CardHeader
              className={classes.header}
              title={<Typography>{events[activeStep].nom}</Typography>}
              subheader={
                <Typography variant="body1" style={{ fontWeight: "100" }}>
                  {new Date(
                    events[activeStep].dateEvenement
                  ).toLocaleDateString("fr-FR")}
                </Typography>
              }
              action={
                <Button style={{ marginTop: "1rem" }} onClick={handleDelete}>
                  Delete<DeleteForeverIcon></DeleteForeverIcon>
                </Button>
              }
            />
            <SwipeableViews
              index={activeStep}
              onChangeIndex={handleStepChange}
              enableMouseEvents
            >
              {events.map((element, index) => (
                <div
                  key={index}
                  className={classes.image}
                  style={{ backgroundImage: `url(${element.imgUrl})` }}
                >
                  {!element.imgUrl ? "Image not found" : ""}
                </div>
              ))}
            </SwipeableViews>

            <CardContent>
              <Scrollbars
                autoHide
                autoHideTimeout={200}
                autoHideDuration={200}
                style={{ height: "10vh" }}
              >
                <Typography style={{ overflow: "hidden" }}>
                  {events[activeStep].description}
                </Typography>
              </Scrollbars>
            </CardContent>
            <CardActionArea disableRipple>
              <MobileStepper
                steps={maxSteps}
                position="static"
                variant="progress"
                activeStep={activeStep}
                nextButton={
                  <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
                  >
                    Next
                    <KeyboardArrowRight />
                  </Button>
                }
                backButton={
                  <Button
                    size="small"
                    onClick={handleBack}
                    disabled={activeStep === 0}
                  >
                    <KeyboardArrowLeft />
                    Back
                  </Button>
                }
              />
            </CardActionArea>
          </Card>
        ) : (
          <Card>
            <Typography
              variant="h6"
              color="primary"
              style={{ position: "relative", maxWidth: "50vw", margin: "0" }}
            >
              Votre restaurant n'a pas encore d'évènements
            </Typography>
          </Card>
        )}
      </Grid>
      <Grid item>
        <Button onClick={handleAjout} disabled={ajout}>
          ajouter un évenement
        </Button>
      </Grid>
      {ajout ? (
        <Grid item>
          <Card className={classes.root}>
            <CardHeader
              className={classes.header}
              title={<TextField label={"Titre"} onChange={handleTitre} />}
              subheader={
                // <Typography variant="body1" style={{ fontWeight: "100" }}>
                //   {events[activeStep].dateEvenement}
                // </Typography>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date d'évenement"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              }
            />
            {imgLoading ? (
              <Grid item xs={12} sm="auto">
                <CircularProgress color="primary" />
              </Grid>
            ) : imageUrl !== "" ? (
              <Grid item xs={12} sm="auto">
                <div
                  className={classes.image}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Grid>
            ) : (
              <></>
            )}

            <CardContent item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                disableElevation
                component="label"
                disabled={imageUrl !== ""}
              >
                Ajouter une image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleUpload}
                />
              </Button>
            </CardContent>
            <CardContent>
              <TextField
                variant="outlined"
                fullWidth
                multiline
                rows={6}
                label="Descripstion"
                onChange={handleDescription}
              />
            </CardContent>
            <CardActionArea>
              <Button
                disabled={confirmer}
                style={{ marginLeft: "80%" }}
                onClick={handleConfirmer}
              >
                Confirmer
              </Button>
            </CardActionArea>
          </Card>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};

export default EventsGerant;
