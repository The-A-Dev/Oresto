import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import MapAdding from "./MapAdding";
import { villes } from "../util/variables";
// import { CodeSharp } from "@material-ui/icons";

function RestaurantForm({ values, setValues }) {
  const [imageUrls, setImages] = React.useState([]);
  const [imgLoading, setImgLoad] = React.useState(false);
  const [tags, setTags] = React.useState(values.tags);
  const [ville, setVille] = React.useState(values.ville);
  React.useEffect(() => {
    //set existing images in container
    if (values.imgUrls.length > 0) {
      setImages(values.imgUrls);
      console.log("Images setted in container");
    }
    console.log("ThisRestauForm rendered");
  }, [values.imgUrls]);

  const handleUpload = async (event) => {
    if (event.target.files[0]) {
      const data = new FormData();
      data.append("file", event.target.files[0]);
      data.append("upload_preset", "restaurant");
      setImgLoad(true);
      const res = await fetch(process.env.REACT_APP_CLOUD, {
        method: "POST",
        body: data,
      });
      // console.log(process.env.REACT_APP_CLOUD);
      // console.log(process.env);

      const file = await res.json();
      //console.log(file);

      imageUrls.push(file.secure_url);
      setImages(imageUrls);
      //console.log(imageUrls);
      values.imgUrls = imageUrls;
      setValues(values);
      setImgLoad(false);
    }
  };
  const handleChange = (key) => (event, value) => {
    if (key === "tags") {
      values[key] = value;
      setTags(value);
    } else if (key === "ville") {
      values[key] = value;
      setVille(value);
    } else {
      values[key] = event.target.value;
    }
    setValues(values);
    console.log(values);
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Détails du restaurant
      </Typography>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} sm={6}>
          <TextField
            autoComplete="name"
            name="nomRestaurant"
            variant="outlined"
            required
            fullWidth
            id="nomRestaurant"
            label="Nom du restaurant"
            defaultValue={values.nomRestaurant}
            onChange={handleChange("nomRestaurant")}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            placeholder="Décrivez votre restaurant..."
            multiline
            fullWidth
            rowsMax={4}
            defaultValue={values.description}
            // value={values.description}
            onChange={handleChange("description")}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} sm={7}>
          {/*TODO: Make autocomple*/}
          <Autocomplete
            disableClearable
            options={villes.map((option) => option)}
            name="ville"
            value={ville}
            onChange={handleChange("ville")}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Ville"
                required
                margin="normal"
                variant="outlined"
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
          {/* <TextField
            variant="outlined"
            required
            id="ville"
            label="Ville"
            name="ville"
            fullWidth
            defaultValue={values.ville}
            onChange={handleChange("ville")}
          /> */}
        </Grid>

        <Grid item xs={12}>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={topTags}
            // defaultValue={[topTags[1]]}
            value={tags}
            name="tags"
            onChange={handleChange("tags")}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="Tags du restaurant"
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  color="primary"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
          />
        </Grid>
        {imgLoading ? (
          <Grid item xs={12} sm="auto">
            <CircularProgress color="primary" />
          </Grid>
        ) : (
          imageUrls.map((imageUrl) => (
            <Grid item xs={12} sm="auto" key={imageUrls.indexOf(imageUrl)}>
              <Card
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  height: "100px",
                  width: "100px",
                }}
              ></Card>
            </Grid>
          ))
        )}
        {imageUrls.length < 10 ? (
          <Grid item xs={12} sm={6}>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              component="label"
            >
              Ajouter des images
              <input
                type="file"
                accept="image/*"
                hidden
                onChange={handleUpload}
              />
            </Button>
          </Grid>
        ) : (
          <> </>
        )}
        <Grid item xs={12} style={{ paddingBottom: 0, paddingTop: 20 }}>
          <Typography
            variant="body1"
            style={{ marginLeft: "10px", fontSize: "1.25rem" }}
          >
            Où se trouve votre restaurant?
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <MapAdding values={values} setValues={setValues} />
        </Grid>

        {/* <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disableElevation
            component="label"
          >
            Ajouter la localisation
          </Button>
        </Grid> */}
      </Grid>
      {console.log("From Restau:", values)}
    </React.Fragment>
  );
}

const topTags = [
  "Alcool",
  "Calme",
  "Convient au couples",
  "En Groupe",
  "Restaurant touristique",
  "Fastfood",
  "Healthy",
  "Traditionnel",
  "Repas d'affaires",
  "Bar",
  "Diner",
];

export default RestaurantForm;
