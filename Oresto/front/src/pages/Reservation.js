import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ReservationForm from "../components/ReservationForm";
import Appbar from "../components/Appbar";

const useStyles = makeStyles((theme) => ({
  layout: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 700,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
}));

function Reservation() {
  const classes = useStyles();
  return (
    <>
      <Appbar title="Reservation" />
      <main className={classes.layout}>
        <ReservationForm />
      </main>
    </>
  );
}

export default Reservation;
