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
import { updateCommandeGerantAction } from "../services/actions/gerantActions";
import { useDispatch } from "react-redux";

const CommandesGerant = ({ commandes }) => {
  const dispatch = useDispatch();
  const [x, setX] = useState([...commandes]);
  const handleChange = (i) => (event) => {
    commandes[i].etat = event.target.value;
    console.log(event.target.value);
    dispatch(updateCommandeGerantAction(commandes[i]._id, event.target.value));
    setX([...commandes]);
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom</TableCell>
          <TableCell>Téléphone</TableCell>
          <TableCell>Etat</TableCell>
          <TableCell>Plats</TableCell>
          <TableCell>Prix</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {x.map((commande, index) => (
          <TableRow key={commande._id}>
            <TableCell>{commande.nom}</TableCell>
            <TableCell>{commande.numTel}</TableCell>
            <TableCell>
              <FormControl key={commande._id}>
                <Select
                  value={commande.etat}
                  onChange={handleChange(index)}
                  disabled={
                    commande.etat === "Annulée" ||
                    commande.etat === "Refusée" ||
                    commande.etat === "Terminée"
                  }
                  displayEmpty
                >
                  <MenuItem
                    disabled={
                      commande.etat === "Confirmée" ||
                      commande.etat === "En cours"
                    }
                    value={"En cours"}
                  >
                    En cours
                  </MenuItem>
                  <MenuItem
                    disabled={commande.etat === "Confirmée"}
                    value={"Confirmée"}
                  >
                    Confirmée
                  </MenuItem>
                  <MenuItem value={"Terminée"}>Terminée</MenuItem>
                  <MenuItem
                    disabled={commande.etat === "Refusée"}
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
              {commande.platsCommande.map((plat) => (
                <div key={plat.platID}>
                  <div>
                    {plat.nomPlat} x{plat.nombreUnite}
                  </div>
                </div>
              ))}
            </TableCell>
            <TableCell>{commande.prix} DT</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CommandesGerant;
