import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import RestoInfoCard from "./RestoInfoCard";
import { useSelector, useDispatch } from "react-redux";
import { villes } from "../util/variables";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { makeStyles } from "@material-ui/core";
import { mapRestaurantsAction } from "../services/actions/dataActions";

const useStyles = makeStyles((theme) => ({
  searchBox: {
    margin: "1% 5%",
    width: "30%",
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: theme.shape.borderRadius,
  },
}));

const mapContainerStyle = {
  width: "98.9vw",
  height: "90vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = () => {
  const dispatch = useDispatch();

  const { searchedRestaurants, mapCenter } = useSelector((state) => state.data);

  const classes = useStyles();

  const [selected, setSelected] = React.useState(null);
  const [ville, setVille] = React.useState("");
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS,
  });
  console.log(process.env.REACT_APP_MAPS);

  const handleInputChange = (event, value) => {
    setVille(value);
    if (value !== "") {
      dispatch(mapRestaurantsAction(value));
      console.log(mapCenter);
    }
  };

  const markers = searchedRestaurants.map((res, index) => {
    return (
      <Marker
        key={index}
        icon={{
          url: "/RestoIcon.png",
          scaledSize: new window.google.maps.Size(40, 40),
          origin: new window.google.maps.Point(0, 0),
          anchor: new window.google.maps.Point(20, 20),
        }}
        position={{ lat: res.coordonnee.lat, lng: res.coordonnee.lng }}
        onClick={() => {
          console.log("marker" + index + "clicked");
          setSelected(res);
        }}
        onMouseOver={() => {
          console.log(res.nom);
        }}
      />
    );
  });
  console.log(searchedRestaurants);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={mapCenter}
        options={options}
        onClick={(event) => {
          setSelected(null);
        }}
      >
        <div className={classes.searchBox}>
          <Autocomplete
            disableClearable
            options={villes.map((option) => option)}
            name="ville"
            value={ville}
            onChange={handleInputChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Où êtes-vous..."
                margin="normal"
                variant="outlined"
                className={classes.searchBar}
                fullWidth
                InputProps={{ ...params.InputProps, type: "search" }}
              />
            )}
          />
        </div>
        {markers}
        {selected ? (
          <InfoWindow
            className="info-window"
            position={{
              lat: selected.coordonnee.lat,
              lng: selected.coordonnee.lng,
            }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            {/* <div>
              <h2>Restaurants Info</h2>
              <p> {selected.nom}</p>
            </div> */}
            <RestoInfoCard restoInfo={selected} />
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
};

export default Map;
