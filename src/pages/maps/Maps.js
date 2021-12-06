import React, { useLayoutEffect, useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import { em } from "../../utils/document";

// styles
import useStyles from "./styles";


export default function Maps() {
  const [lat, setlat] = useState('')
  const [long, setlong] = useState('')

  let classes = useStyles();

  useLayoutEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
    });
  }, [])

  const BasicMap = withScriptjs(
    withGoogleMap(() => (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: parseFloat(lat || 0),
          lng: parseFloat(long || 0),
        }}
      >
        <Marker position={{ lat: lat, lng: long }} />
      </GoogleMap>
    )),
  );

  return (
    <div className={classes.mapContainer}>
      <BasicMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: "inherit", width: "inherit" }} />}
        containerElement={<div style={{ height: em(40), width: '100%', padding: em(1) }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
    </div>
  );
}
