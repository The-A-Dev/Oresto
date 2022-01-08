import React from "react";
import { Checkbox, Zoom, TextField, Grid, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  quantity: {
    width: "5rem",
  },
}));

const CheckBoxGerant = ({ id }) => {
  const [checked, setChecked] = React.useState({
    plat: { platID: "", quantitee: 1 },
    etat: false,
  });
  const handleChangeCheckBox = (event) => {
    setChecked((prev) => ({
      plat: { ...prev.plat, platID: event.target.value },
      etat: !checked.etat,
    }));
  };
  const handleChangeQuantity = (event) => {
    setChecked((prev) => ({
      ...prev,
      plat: { ...prev.plat, quantitee: event.target.value },
    }));
  };

  const classes = useStyles();
  return (
    <Grid container alignItems="flex-start">
      <Grid item>
        <Checkbox
          checked={checked.etat}
          value={id}
          color="primary"
          onChange={handleChangeCheckBox}
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </Grid>
      {checked.etat && (
        <Zoom in={checked.etat}>
          <Grid item className={classes.quantity}>
            <TextField
              label="quantitée"
              type="number"
              size="small"
              onChange={handleChangeQuantity}
              defaultValue={1}
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

export default CheckBoxGerant;
