import { React, useState } from "react";
// import eventsData from "../util/eventsData";
import { Scrollbars } from "react-custom-scrollbars";
import SwipeableViews from "react-swipeable-views";

import {
  makeStyles,
  MobileStepper,
  Button,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
} from "@material-ui/core";

import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "60vw",
    minWidth: "20vw",
  },
  header: {},
  date: {},
  image: {
    height: "34vw",
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

const Events = ({ styleProp, eventsData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles();
  console.log(eventsData);
  if (eventsData.length > 0) {
    const maxSteps = eventsData.length;

    let dateEvent = new Date(eventsData[0].dateEvenement);
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      dateEvent = new Date(eventsData[activeStep].dateEvenement);
    };

    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step) => {
      setActiveStep(step);
    };

    return (
      <Card variant="outlined" className={styleProp}>
        <CardHeader
          className={classes.header}
          title={<Typography>{eventsData[activeStep].nom}</Typography>}
          subheader={
            <Typography variant="body1" style={{ fontWeight: "100" }}>
              {new Date(
                eventsData[activeStep].dateEvenement
              ).toLocaleDateString("fr-FR")}
            </Typography>
          }
        />
        <SwipeableViews
          index={activeStep}
          onChangeIndex={handleStepChange}
          enableMouseEvents
        >
          {eventsData.map((element, index) =>
            element.imgUrl ? (
              <div
                key={index}
                className={classes.image}
                style={{ backgroundImage: `url(${element.imgUrl})` }}
              ></div>
            ) : (
              "Image not found"
            )
          )}
        </SwipeableViews>
        {/* <div
        className={classes.image}
        style={{ backgroundImage: `url(${eventsData[activeStep].image})` }}
      >
        {!eventsData[activeStep].image ? "not found" : ""}
      </div> */}

        <CardContent>
          <Scrollbars
            autoHide
            autoHideTimeout={200}
            autoHideDuration={200}
            style={{ height: "10vh" }}
          >
            <Typography style={{ overflow: "hidden" }}>
              {eventsData[activeStep].description}
            </Typography>
          </Scrollbars>
        </CardContent>
        <CardActionArea disableRipple>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
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
    );
  }
  return (
    <Card style={{ padding: 20 }}>
      <Typography
        variant="h6"
        color="primary"
        style={{ position: "relative", maxWidth: "50vw", margin: "0" }}
      >
        Ce restaurant n'a pas encore d'évènements
      </Typography>
    </Card>
  );
};

export default Events;
