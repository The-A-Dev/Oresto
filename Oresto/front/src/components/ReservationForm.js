import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { reserverAction } from "../services/actions/userActions";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  RadioGroup,
  Radio,
  makeStyles,
  CardActions,
  Button,
  TextField,
} from "@material-ui/core";
// import formReservation from "../util/reservationForm";
import DateFnsUtils from "@date-io/date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";

const useStyle = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  // element: { padding: "0 0 0rem 0rem" },
  reponse: { padding: "0.5rem 0rem 0 0.5rem" },
}));
let questionReponse = [];

const ReservationForm = () => {
  const classes = useStyle();
  const { restoData } = useSelector((state) => state.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const formReservation = restoData.formReservation;

  let dateReserv = new Date();
  const [envoyer, setEnvoyer] = useState(false);
  const [date, setDate] = useState(new Date());
  const [fullReponses, setFullReponses] = useState({
    formReponse: formReservation.map((element) => ({
      question: element.question,
      reponse: element.reponses[0],
    })),
    dateReservation: dateReserv,
    nombreReservation: 1,
  });

  const handleChange = (index1) => (event) => {
    let inter = [...fullReponses.formReponse];

    inter[index1].reponse = event.target.value;
    console.log(inter);
    setFullReponses({ ...fullReponses, formReponse: [...inter] });
  };
  const handleDateChange = (selectedDate) => {
    setFullReponses((prev) => ({
      ...prev,
      dateReservation: new Date(date),
    }));
    setDate(selectedDate);
  };
  const handleNombre = (event) => {
    setFullReponses((prev) => ({
      ...prev,
      nombreReservation: event.target.value,
    }));
  };

  const handleEnvoyer = () => {
    let date = fullReponses.dateReservation;
    fullReponses.dateReservation = date.toISOString();
    console.log(fullReponses);
    dispatch(reserverAction(fullReponses, restoData._id, history));

    console.log(fullReponses);
    // setEnvoyer(true);
  };
  return (
    <React.Fragment>
      <CssBaseline />
      <Card className={classes.card}>
        <CardContent>
          <Grid container direction="column" spacing={5}>
            <Grid item>
              <Grid container justify="space-between" spacing={1}>
                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      style={{ width: "11rem" }}
                      disableToolbar
                      variant="inline"
                      format="dd/MM/yyyy"
                      label="Date de réservation"
                      value={date}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      onChange={handleDateChange}
                    />
                    <KeyboardTimePicker
                      style={{ width: "11rem" }}
                      variant="inline"
                      label="Date de réservation"
                      value={date}
                      KeyboardButtonProps={{
                        "aria-label": "change time",
                      }}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item>
                  <TextField
                    label="Nombre de personnes"
                    value={fullReponses.nombreReservation}
                    variant="outlined"
                    style={{ width: "10rem" }}
                    type="number"
                    onChange={handleNombre}
                  />
                </Grid>
              </Grid>
            </Grid>
            {formReservation.map((element, index1) => (
              <Grid item className={classes.element} key={index1}>
                <Card variant="outlined">
                  <CardContent>
                    <Typography style={{ paddingBottom: "0.5vh" }}>
                      {element.question}
                    </Typography>
                    <Divider light />
                    <Grid
                      container
                      className={classes.reponse}
                      direction="column"
                      justify="space-evenly"
                      spacing={1}
                    >
                      <RadioGroup
                        onChange={handleChange(index1)}
                        value={fullReponses.formReponse[index1].reponse}
                        name={element.question}
                      >
                        {element.reponses.map((reponse, index) => {
                          return (
                            <Grid item key={index}>
                              <Grid
                                container
                                justify="space-between"
                                alignItems="center"
                              >
                                <Grid item>
                                  <Typography>{reponse}</Typography>
                                </Grid>
                                <Grid item>
                                  <Radio
                                    name={element.question}
                                    value={reponse}
                                    color="primary"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          );
                        })}
                      </RadioGroup>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </CardContent>
        <CardActions>
          <Button
            disabled={envoyer}
            style={{ marginLeft: "auto" }}
            variant="contained"
            color="primary"
            onClick={handleEnvoyer}
          >
            Envoyer
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default ReservationForm;
