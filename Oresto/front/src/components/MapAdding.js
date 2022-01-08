import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "30vw",
  height: "30vh",
  // border: "2px solid #CC2121",
  borderRadius: "30px",
};

const center = {
  lat: 36.80691236510967,
  lng: 10.183186,
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MapAdding = ({ values, setValues }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS,
  });

  const [marker, setMarker] = React.useState();

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps...";

  return (
    <div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        mapContainerClassName="mapAdding"
        zoom={8}
        center={center}
        options={options}
        onClick={(event) => {
          const coordonnee = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
          };
          setMarker({ coordonnee });
          setValues({ ...values, coordonnee });
        }}
      >
        {marker && (
          <Marker
            position={{
              lat: marker.coordonnee.lat,
              lng: marker.coordonnee.lng,
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapAdding;
