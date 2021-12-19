import { Grid } from "@material-ui/core";
import React, { useLayoutEffect, useState } from "react";
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
} from "react-google-maps";
import MetroStats from "../../components/MetroStats/MetroStats";
import PageTitle from "../../components/PageTitle/PageTitle";
import config from "../../config";
import term from "../../terms";
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
      <PageTitle title={term('map')} />
      <BasicMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyCMoe_LmnA0wBSKsB9wQTfvA8xRZkajrS4&callback=initMap"
        loadingElement={<div style={{ height: "inherit", width: "inherit" }} />}
        containerElement={<div style={{ height: em(40), width: '100%', padding: em(1) }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
      <Grid container
        direction="row"
        justifyContent="space-evenly"
        alignItems="stretch" spacing={2}>
        {config.MetroStats.map(stat => (
          <Grid item lg={1} md={12} sm={12} xs={12} key={stat.product}>
            <MetroStats {...stat} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
