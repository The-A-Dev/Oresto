import { React, useState } from "react";
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  MenuItem,
  FormControl,
  Typography,
  Box,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateReservationGerantAction } from "../services/actions/gerantActions";

const ReservationsGerant = ({ reservations }) => {
  const [x, setX] = useState([...reservations]);
  const dispatch = useDispatch();

  const handleChange = (i) => (event) => {
    reservations[i].etat = event.target.value;
    console.log(event.target.value);
    dispatch(
      updateReservationGerantAction(reservations[i]._id, event.target.value)
    );
    setX([...reservations]);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Tel</TableCell>
          <TableCell>Etat</TableCell>
          <TableCell>Date Reservation</TableCell>
          <TableCell>Nombre de personnes</TableCell>
          <TableCell>Detail</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {x.map((reservation, index) => (
          <TableRow key={reservation.id}>
            <TableCell>{reservation.nom}</TableCell>
            <TableCell>{reservation.numTel}</TableCell>
            <TableCell>
              <FormControl key={reservation._id}>
                <Select
                  value={reservation.etat}
                  onChange={handleChange(index)}
                  disabled={
                    reservation.etat === "Annulée" ||
                    reservation.etat === "Refusée" ||
                    reservation.etat === "Terminée"
                  }
                  displayEmpty
                >
                  <MenuItem
                    disabled={
                      reservation.etat === "Confirmée" ||
                      reservation.etat === "En cours"
                    }
                    value={"En cours"}
                  >
                    En cours
                  </MenuItem>
                  <MenuItem
                    disabled={reservation.etat === "Confirmée"}
                    value={"Confirmée"}
                  >
                    Confirmée
                  </MenuItem>
                  <MenuItem value={"Terminée"}>Terminée</MenuItem>
                  <MenuItem
                    disabled={reservation.etat === "Refusée"}
                    value={"Refusée"}
                  >
                    Refusée
                  </MenuItem>
                  <MenuItem disabled value={"Annulée"}>
                    Annulée
                  </MenuItem>
                </Select>
              </FormControl>
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
            <TableCell>{reservation.nombreReservation}</TableCell>
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

export default ReservationsGerant;
