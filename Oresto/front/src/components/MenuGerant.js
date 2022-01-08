import { useState } from "react";
import { updateMenuAction } from "../services/actions/gerantActions";
import AddIcon from "@material-ui/icons/Add";
import {
  Typography,
  Grid,
  makeStyles,
  Card,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  TextField,
  Button,
  Tooltip,
  Divider,
} from "@material-ui/core";
import { useDispatch } from "react-redux";

const useStyle = makeStyles((theme) => ({
  root: {
    maxWidth: "90%",
    position: "relative",
    left: "2%",
  },
  categorie: {},
  plat: {},
  ingredient: {},
  quantity: {},
  accordion: {},
}));
const MenuGerant = ({ menuData }) => {
  const classes = useStyle();
  const dispatch = useDispatch();

  const [menu, setMenu] = useState([...menuData]);
  const [confirmer, setConfirmer] = useState(false);
  let array = [...menu];
  const addCategorie = () => {
    array.push({
      categorie: "",
      plats: [{ nomPlat: "", ingredients: [], prixUnitaire: 0 }],
    });
    setMenu([...array]);
  };
  const addPlat = (i) => () => {
    array[i].plats.push({
      nomPlat: "",
      ingredients: [],
      prixUnitaire: 0,
    });
    setMenu([...array]);
  };
  const addIngredient = (i, j) => () => {
    array[i].plats[j].ingredients.push("");
    setMenu([...array]);
  };

  const handleChangeCategorieName = (i) => (event) => {
    array[i].categorie = event.target.value;
    setMenu([...array]);
  };
  const handleChangeNomPlat = (i, j) => (event) => {
    array[i].plats[j].nomPlat = event.target.value;
    setMenu([...array]);
  };
  const handleChangePrixUnitaire = (i, j) => (event) => {
    array[i].plats[j].prixUnitaire = event.target.value;
    setMenu([...array]);
  };
  const handleChangeIngredients = (i, j, k) => (event) => {
    array[i].plats[j].ingredients[k] = event.target.value;
    setMenu([...array]);
  };

  const handleConfirmer = () => {
    console.log(menu);
    dispatch(updateMenuAction(menu));
  };

  return (
    <Card className={classes.root}>
      {menu.map((categorie, index3) => (
        <Accordion
          expanded
          key={index3}
          className={classes.accordion}
          defaultExpanded
        >
          <AccordionSummary
            expandIcon={
              <Button
                style={{ rotate: "180" }}
                onClick={addPlat(index3)}
                variant="contained"
                color="primary"
                disableElevation
              >
                <AddIcon />
              </Button>
            }
          >
            <Typography variant="h6">
              <TextField
                variant="outlined"
                defaultValue={categorie.categorie}
                label={`Categorie ${index3 + 1}`}
                style={{ width: "10rem" }}
                onChange={handleChangeCategorieName(index3)}
              />
            </Typography>
            <Typography
              style={{
                marginLeft: "auto",
                marginTop: "1rem",
              }}
            >
              Ajouter un plat
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container direction="column" justify="flex-start" spacing={2}>
              {categorie.plats.map((plat, index2) => (
                <>
                  <Grid item className={classes.plat} key={index2}>
                    <Grid
                      container
                      alignItems="baseline"
                      justify="space-between"
                      className={classes.platprix}
                      style={{ marginBottom: "0" }}
                      spacing={6}
                    >
                      <Grid item>
                        <Typography>
                          <TextField
                            defaultValue={plat.nomPlat}
                            onChange={handleChangeNomPlat(index3, index2)}
                            variant="outlined"
                            color="secondary"
                            label={`Plat ${index2 + 1}`}
                            style={{ width: "15rem" }}
                            size="small"
                          />
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={{ fontWeight: "500" }}>
                          <TextField
                            type="number"
                            style={{ width: "6rem" }}
                            defaultValue={plat.prixUnitaire}
                            label={`Prix`}
                            onChange={handleChangePrixUnitaire(index3, index2)}
                            variant="outlined"
                            size="small"
                          />
                          DT
                        </Typography>
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
                            <TextField
                              defaultValue={ingredient}
                              label={`Ingredient ${index + 1}`}
                              onChange={handleChangeIngredients(
                                index3,
                                index2,
                                index
                              )}
                              variant="outlined"
                              style={{ width: "8rem" }}
                              size="small"
                            />
                          </Typography>
                        </Grid>
                      ))}
                      <Grid item>
                        <Tooltip title="Ajouter un ingrédient">
                          <Button
                            onClick={addIngredient(index3, index2)}
                            variant="contained"
                            disableElevation
                          >
                            <AddIcon />
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </Grid>
                  {index2 < categorie.plats.length - 1 && (
                    <Divider style={{ margin: "10px 0px" }} light />
                  )}
                </>
              ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      ))}
      <Accordion>
        <AccordionSummary>
          <Button onClick={addCategorie} style={{ marginLeft: "1rem" }}>
            Ajouter une catégorie
          </Button>
          <Button
            onClick={handleConfirmer}
            variant="contained"
            color="primary"
            disabled={confirmer}
            style={{ marginLeft: "auto" }}
          >
            Confirmer
          </Button>
        </AccordionSummary>
      </Accordion>
    </Card>
  );
};

export default MenuGerant;
