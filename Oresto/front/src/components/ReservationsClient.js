import { React, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Box,
  Button,
  Grid,
} from "@material-ui/core";
import reservationData from "../util/reservationData";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { annulerReservationAction } from "../services/actions/clientActions";
import { useDispatch } from "react-redux";
let array = reservationData;
const ReservationsClient = ({ reservations }) => {
  const [x, setX] = useState(reservations);
  const dispatch = useDispatch();
  const handleDelete = (i, id) => () => {
    reservations[i].etat = "Annulée";
    dispatch(annulerReservationAction(id, reservations));
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Nombre de personnes</TableCell>
          <TableCell>Etat</TableCell>
          <TableCell>Date Reservation</TableCell>
          <TableCell>Detail</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {x.map((reservation, index) => (
          <TableRow key={index}>
            <TableCell>{reservation.nomRestaurant}</TableCell>
            <TableCell>{reservation.nombreReservation}</TableCell>
            <TableCell>
              <Grid container justify="space-around" alignItems="baseline">
                <Grid item>{reservation.etat}</Grid>
                <Grid item>
                  <Button
                    size="small"
                    style={{ width: "1px" }}
                    variant="contained"
                    color="primary"
                    disabled={
                      reservation.etat === "Refusée" ||
                      reservation.etat === "Terminée" ||
                      reservation.etat === "Annulée"
                    }
                    onClick={handleDelete(index, reservation._id)}
                  >
                    <DeleteForeverIcon style={{ width: "1.5rem" }} />
                  </Button>
                </Grid>
              </Grid>
            </TableCell>
            <TableCell>
              {new Date(reservation.dateReservation).toLocaleString("fr-FR", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </TableCell>
            <TableCell>
              {reservation.formReponse.map((element, index1) => (
                <Box key={index1}>
                  <Typography>{`Q${index1 + 1}: ${
                    element.question
                  }`}</Typography>
                  <Typography>{`R${index1 + 1}: ${
                    element.reponse
                  }`}</Typography>
                  {index1 !== reservation.formReponse.length - 1 ? (
                    <Typography>----</Typography>
                  ) : null}
                </Box>
              ))}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ReservationsClient;
