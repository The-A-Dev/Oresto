import { React, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Button,
} from "@material-ui/core";
import commandesData from "../util/commandesData";
import { annulerCommandeAction } from "../services/actions/clientActions";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import { useDispatch } from "react-redux";

let array = commandesData;

const CommandesClient = ({ commandes }) => {
  const dispatch = useDispatch();
  const [x, setX] = useState([...commandes]);
  const handleDelete = (i, id) => () => {
    commandes[i].etat = "Annulée";
    dispatch(annulerCommandeAction(id, commandes));
  };
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Nom du restaurant</TableCell>

          <TableCell>Etat</TableCell>
          <TableCell>Plats</TableCell>
          <TableCell>Prix Total</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {x.map((commande, index) => (
          <TableRow key={commande.id}>
            <TableCell>{commande.nomRestaurant}</TableCell>

            <TableCell>
              <Grid container justify="space-between" alignItems="baseline">
                <Grid item>{commande.etat}</Grid>
                <Grid item>
                  <Button
                    size="small"
                    style={{ width: "1px" }}
                    variant="contained"
                    color="primary"
                    disabled={
                      commande.etat === "Refusée" ||
                      commande.etat === "Terminée" ||
                      commande.etat === "Annulée"
                    }
                    onClick={handleDelete(index, commande._id)}
                  >
                    <DeleteForeverIcon style={{ width: "1.5rem" }} />
                  </Button>
                </Grid>
              </Grid>
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

export default CommandesClient;
