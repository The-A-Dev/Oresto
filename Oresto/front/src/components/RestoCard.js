import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Grid,
  Chip,
  Typography,
  CardContent,
  Card,
  makeStyles,
  Box,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";

import LoginPopUp from "./Login-Signup/LoginPopUp";

const useStyles = makeStyles((theme) => ({
  title: {
    color: "white",
    fontWeight: "500",
  },
  tag: {
    color: "#FFFFFF",

    borderColor: "#FFFFFF",
  },
  description: {
    color: "white",
  },
  iconFilled: {
    color: theme.palette.primary.main,
  },
  iconEmpty: {
    color: theme.palette.secondary.main,
    opacity: "0.5",
  },
  rating: {
    padding: "0rem 0rem 0.5rem 0rem",
  },
  nombreAvis: {
    color: "white",
  },
  content: {
    overflow: "hidden",
  },
}));

const RestoCard = ({ className, restoData }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const classes = useStyles();
  const [popupOpen, setPopupOpen] = React.useState(false);

  const handleReservationOnClick = () => {
    setPopupOpen(true);
  };

  return (
    <>
      <Card raised className={className}>
        <Scrollbars>
          <CardContent className={classes.content}>
            <Typography variant="h3" className={classes.title}>
              {restoData.nom}
            </Typography>
            <Typography
              variant="body2"
              className={classes.title}
              style={{ margin: "0px 5px" }}
            >
              {restoData.ville}, Tunisie.
            </Typography>
            <Grid
              container
              className={classes.rating}
              spacing={1}
              alignItems="flex-start"
            >
              <Grid item xs={12} sm={4}>
                <Rating
                  size="large"
                  precision={0.5}
                  classes={{
                    iconFilled: classes.iconFilled,
                    iconEmpty: classes.iconEmpty,
                  }}
                  value={restoData.noteMoyenne}
                  name="rating"
                  readOnly
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Typography
                  className={classes.nombreAvis}
                  variant="h6"
                  component="p"
                >
                  ({restoData.nbrAvis})
                </Typography>
              </Grid>
              <Grid item xs={12} sm={5}>
                {authenticated ? (
                  restoData.formReservation.length !== 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      disableElevation
                      component={RouterLink}
                      fullWidth
                      to="/reservation"
                      style={{ marginTop: "1rem" }}
                    >
                      Réserver maintenant
                    </Button>
                  )
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={handleReservationOnClick}
                    disableElevation
                    fullWidth
                    style={{ marginTop: "1rem" }}
                  >
                    Réserver maintenant
                  </Button>
                )}
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              {restoData.tags.map((tag, index) => (
                <Grid item key={index}>
                  <Chip
                    className={classes.tag}
                    variant="outlined"
                    label={tag}
                  />
                </Grid>
              ))}
            </Grid>

            <Box style={{ margin: "0.5rem 0rem" }}>
              <Typography className={classes.description}>
                {restoData.description}
              </Typography>
            </Box>
          </CardContent>
        </Scrollbars>
      </Card>
      <LoginPopUp open={popupOpen} setOpen={setPopupOpen} />
    </>
  );
};

export default RestoCard;
