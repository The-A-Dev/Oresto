import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";

import {
  makeStyles,
  IconButton,
  Fade,
  Tabs,
  Tab,
  Box,
  Typography,
  AppBar,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Header from "../components/Header";
import RestoCard from "../components/RestoCard";
import RestoMenu from "../components/RestoMenu";
import Events from "../components/Events";
import Avis from "../components/Avis";

import { restaurantDataAction } from "../services/actions/dataActions";

import { useSelector, useDispatch } from "react-redux";
//! delete this

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && (
        <Box p={index === 0 ? 0 : 3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "84vh",

    display: "flex",
  },
  firstImgContainer: {
    height: "100%",
    width: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  rightContainer: {
    height: "100%",
    width: "50%",
  },

  secondImgContainer: {
    height: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  next: {
    position: "absolute",
    opacity: 0.8,
    right: "23%",
    top: "85%",
    height: "10vh",
    width: "10vh",
    zIndex: "10",
  },
  arrow: {
    position: "relative",
    color: "white",
    height: "10vh",
    width: "15vw",
    zIndex: "10",
  },
  card: {
    overflow: "hidden",
    minWidth: "34rem",
    height: "35vh",
    position: "absolute",
    left: "5%",
    top: "30vh",
    padding: "0rem 0.5rem 1rem 0.2rem",
    backgroundColor: "rgba(0,0,0,0.65)",
    zIndex: "10",
  },
  menu: {
    position: "relative",
    margin: "0 auto",

    maxWidth: "50vw",
  },
  events: {
    position: "relative",
    margin: "0 auto",
    backgroundColor: "#eeeeee",
    maxWidth: "50vw",
  },
}));

function Resto() {
  const [value, setValue] = useState(0);
  const [current, setCurrent] = useState([1, 2]);
  const classes = useStyles();

  const { restoData } = useSelector((state) => state.data);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(restaurantDataAction(id));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const nextImage = () => {
    setCurrent(() => {
      if (current[1] === length) {
        return [current[1], 1];
      } else if (current[0] === length) {
        return [1, 2];
      } else {
        return [current[1], current[1] + 1];
      }
    });
    console.log(current);
  };

  let length = restoData.urlPhotos.length - 1;

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <>
      <Header />

      <AppBar position="static" style={{ height: "6vh" }}>
        <Tabs value={value} onChange={handleChange} variant="fullWidth">
          <Tab label="Présentation" />
          <Tab label="Menu" />
          <Tab label="Evenements" />
          <Tab label="Avis" />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis="x-reverse"
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0}>
          <div style={{ height: "auto" }}>
            <div className={classes.mainContainer}>
              <RestoCard className={classes.card} restoData={restoData} />

              <div
                className={classes.firstImgContainer}
                style={{ backgroundImage: `url(${restoData.urlPhotos[0]})` }}
              />
              <div className={classes.rightContainer}>
                {restoData.urlPhotos.map((img, index) => {
                  if (index === current[0])
                    return (
                      <Fade key={index} in={true} timeout={{ enter: 2000 }}>
                        <div
                          className={classes.secondImgContainer}
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </Fade>
                    );
                  return null;
                })}
                {restoData.urlPhotos.map((img, index) => {
                  if (index === current[1])
                    return (
                      <Fade key={index} in={true} timeout={{ enter: 1000 }}>
                        <div
                          className={classes.secondImgContainer}
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      </Fade>
                    );
                  return null;
                })}
              </div>
            </div>

            <IconButton
              variant="contained"
              className={classes.next}
              color="primary"
              onClick={nextImage}
            >
              <ExpandMoreIcon className={classes.arrow} />
            </IconButton>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <RestoMenu
            dataMenu={restoData.menu}
            restoID={restoData._id}
            styleProp={classes.menu}
          />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Events
            eventsData={restoData.evenements}
            styleProp={classes.events}
          />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Avis avisData={restoData.avis} restoID={id} />
        </TabPanel>
      </SwipeableViews>
    </>
  );
}

export default Resto;
