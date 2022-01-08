import React from "react";
import { Checkbox, Zoom, TextField, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  quantity: {
    width: "5rem",
  },
}));

const CheckBox = ({ prixUnitaire, _id, selectedPlats, setSelectedPlats }) => {
  const [currentPlat, setCurrentPlat] = React.useState({
    platID: _id,
    nombreUnite: 1,
    prixUnitaire: prixUnitaire,
  });
  const [checked, setChecked] = React.useState(false);

  const handleChangeCheckBox = (event) => {
    // you add the checked  IDs to an array
    // then if you need to delete you filter the array
    // to update the quantity you filter the array

    if (!checked) {
      let array = [...selectedPlats, currentPlat];
      setSelectedPlats([...array]);
    } else {
      let array = [...selectedPlats];
      let newArray = array.filter((item) => item.platID !== _id);
      setSelectedPlats([...newArray]);
      setCurrentPlat({
        platID: _id,
        nombreUnite: 1,
        prixUnitaire: prixUnitaire,
      });
    }
    setChecked(!checked);
  };
  const handleChangeQuantity = (event) => {
    if (event.target.value >= 1) {
      console.log(event.target.value);
      let array = [...selectedPlats];
      array.map((element, index) => {
        if (element.platID === _id) {
          array[index] = {
            ...currentPlat,
            nombreUnite: Number.parseInt(event.target.value),
          };
          setSelectedPlats([...array]);
          setCurrentPlat({ ...array[index] });
        }
        return null;
      });
    } else {
      console.log(event.target.value);
      let array = [...selectedPlats];
      array.map((element, index) => {
        if (element.platID === _id) {
          array[index] = { ...currentPlat, nombreUnite: 1 };
          setSelectedPlats([...array]);
          setCurrentPlat({ ...array[index] });
        }
        return null;
      });
    }
  };

  const classes = useStyles();
  return (
    <Grid container alignItems="flex-start">
      <Grid item>
        <Checkbox
          checked={checked}
          value={_id}
          color="primary"
          onChange={handleChangeCheckBox}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      {checked && (
        <Zoom in={checked}>
          <Grid item className={classes.quantity}>
            <TextField
              label="quantitée"
              type="number"
              value={currentPlat.nombreUnite}
              size="small"
              onChange={handleChangeQuantity}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Zoom>
      )}
    </Grid>
  );
};

export default CheckBox;
