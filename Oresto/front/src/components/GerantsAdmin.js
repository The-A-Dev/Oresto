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
} from "@material-ui/core";
import { updateEtatGerant } from "../services/actions/dataActions";
import { useDispatch } from "react-redux";
// import gerantsData from "../util/gerantsData";
// let array = gerantsData;

const GerantsAdmin = ({ gerantsData }) => {
  const dispatch = useDispatch();
  const [x, setX] = useState([...gerantsData]);
  const handleChange = (i, id) => (event) => {
    gerantsData[i].etat = event.target.value;
    dispatch(updateEtatGerant(id, gerantsData, event.target.value));
    // array[i].etat = event.target.value;
    // console.log(event.target.value);
    // setX([...array]);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Tel</TableCell>
          <TableCell>RestaurantID</TableCell>
          <TableCell>Nom du Restaurant</TableCell>
          <TableCell>Age</TableCell>
          <TableCell>Etat</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {x.map((gerant, index) => (
          <TableRow key={gerant._id}>
            <TableCell>{gerant.nom}</TableCell>
            <TableCell>{gerant.numTel}</TableCell>
            <TableCell>{gerant.restaurant}</TableCell>
            <TableCell>{gerant.nomRestaurant}</TableCell>
            <TableCell>{gerant.age}</TableCell>
            <TableCell>
              <FormControl key={gerant._id}>
                <Select
                  value={gerant.etat}
                  onChange={handleChange(index, gerant._id)}
                  displayEmpty
                >
                  {gerant.etat === "En attente" ? (
                    <MenuItem
                      disabled={gerant.etat === "En attente"}
                      value={"En attente"}
                    >
                      En Attente
                    </MenuItem>
                  ) : (
                    ""
                  )}
                  <MenuItem value={"Actif"}>Actif</MenuItem>
                  <MenuItem value={"Rejeté"}>Rejeté</MenuItem>
                </Select>
              </FormControl>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GerantsAdmin;
