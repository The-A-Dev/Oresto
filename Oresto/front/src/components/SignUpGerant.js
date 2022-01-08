import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { ages } from "../util/variables";

export default function SignUpGerant({ values, setValues }) {
  const [age, setAge] = React.useState(18);

  const handleChange = (event) => {
    if (event.target.name === "age") setAge(event.target.value);
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  React.useEffect(() => {
    //Pour plus de securité
    setValues({ ...values, motdepasse: "" });
    console.log("ThisSignupForm rendered");
  }, []);
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Données personnelle
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="fname"
            name="prenom"
            variant="outlined"
            required
            fullWidth
            id="firstName"
            label="Prénom"
            defaultValue={values.prenom}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="lastName"
            label="Nom"
            name="nom"
            autoComplete="lname"
            defaultValue={values.nom}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            variant="outlined"
            select
            required
            fullWidth
            onChange={handleChange}
            id="age"
            label="Age"
            name="age"
            value={age}
            // autoComplete="age"
          >
            {ages.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="numtel"
            label="Téléphone"
            name="numTel"
            defaultValue={values.numTel}
            onChange={handleChange}
          ></TextField>
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            defaultValue={values.email}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="motdepasse"
            label="Mot de passe"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </Grid>
        {console.log("From Signup:", values)}
      </Grid>
    </React.Fragment>
  );
}
