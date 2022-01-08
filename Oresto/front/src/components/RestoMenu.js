import React from "react";
import CheckBox from "./CheckBox";
import {
  Typography,
  Grid,
  makeStyles,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { newCommandeAction } from "../services/actions/clientActions";
import LoginPopUp from "./Login-Signup/LoginPopUp";

const useStyle = makeStyles((theme) => ({
  item: {},
  plat: {},
  ingredient: {},
  quantity: {},
  accordion: {},
}));
const RestoMenu = ({ styleProp, dataMenu, restoID }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const [popupOpen, setPopupOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedPlats, setSelectedPlats] = useState([]);

  // const [prixTotal, setPrixTotal] = useState([]);
  const [confirmed, setConfirmed] = useState(true);

  const classes = useStyle();
  const handleConfirmer = () => {
    // setConfirmed(true);
    console.log(selectedPlats);
    dispatch(
      newCommandeAction({ platsCommande: selectedPlats }, restoID, history)
    );
    // console.log("confirmed: ", confirmed);
  };
  const handleLoginPopup = () => {
    setPopupOpen(true);
  };

  const somme = () => {
    let sum = 0;
    selectedPlats.map((element) => {
      sum = sum + element.prixUnitaire * element.nombreUnite;
      console.log("this; " + element.prixUnitaire * element.nombreUnite);
      return null;
    });

    return sum;
  };
  return (
    <>
      <Card className={styleProp}>
        {dataMenu.length === 0 && (
          <Typography style={{ margin: 20 }} variant="h6" color="primary">
            Ce restaurant n'a pas encore de menu
          </Typography>
        )}
        {dataMenu.map((item, index3) => (
          <Accordion key={index3} className={classes.accordion} defaultExpanded>
            <AccordionSummary>
              <Typography variant="h6">{item.categorie}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid
                container
                direction="column"
                justufy="flex-start"
                spacing={1}
              >
                {item.plats.map((plat, index2) => (
                  <Grid item className={classes.plat} key={index2}>
                    <Grid
                      container
                      alignItems="baseline"
                      justify="space-between"
                      className={classes.platprix}
                    >
                      <Grid item>
                        <Typography>{plat.nomPlat}</Typography>
                      </Grid>
                      <Grid item>
                        <Grid container direction="row" alignItems="center">
                          <Grid>
                            <Typography style={{ fontWeight: "500" }}>
                              {plat.prixUnitaire}DT
                            </Typography>
                          </Grid>

                          <Grid>
                            <CheckBox
                              // prixTotal={prixTotal}
                              // setPrixTotal={setPrixTotal}
                              prixUnitaire={plat.prixUnitaire}
                              _id={plat._id}
                              selectedPlats={selectedPlats}
                              setSelectedPlats={setSelectedPlats}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      direction="row"
                      alignItems="flex-start"
                      className={classes.ingredient}
                      spacing={1}
                    >
                      {plat.ingredients.map((ingredient, index) => (
                        <Grid item key={index}>
                          <Typography variant="body2" color="secondary">
                            {ingredient}
                            {index === plat.ingredients.length - 1 ? "." : ","}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))}
        <Accordion>
          <AccordionSummary alignItems="centre">
            {authenticated ? (
              <Button
                color="primary"
                style={{ marginRight: "auto" }}
                disabled={somme() === 0}
                onClick={handleConfirmer}
              >
                Confirmer
              </Button>
            ) : (
              <Button
                color="primary"
                style={{ marginRight: "auto" }}
                disabled={somme() === 0}
                onClick={handleLoginPopup}
              >
                Confirmer
              </Button>
            )}
            {console.log(selectedPlats)}
            <Typography variant="h6">Prix: {somme()}DT</Typography>
          </AccordionSummary>
        </Accordion>
      </Card>
      <LoginPopUp open={popupOpen} setOpen={setPopupOpen} />
    </>
  );
};

export default RestoMenu;
