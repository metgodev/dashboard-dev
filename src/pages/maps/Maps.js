import React, { useEffect, useState } from "react";
//MUI
import { Grid } from "@material-ui/core";
import CircularProgress from '@mui/material/CircularProgress';
//components
import MetroStats from "../../components/MetroStats/MetroStats";
import PageTitle from "../../components/PageTitle/PageTitle";
import MapPick from '../../components/MapPicker.js/MapPick'
//Helper
import config from "../../config";
import term from "../../terms";
import { useJsApiLoader } from '@react-google-maps/api';
import useGetService from "../../hooks/useGetService";
import { requestParams, sortDataForMap } from "./mapsHelpers";
// styles
import useStyles from "./styles";
import BACK_ROUTES from "../../data/back_routes";
import CACHED_DATA_ROUTES from "../../data/cached_data_routes";
//CONSTS
const { REACT_APP_GOOGLE_API_KEY } = process.env

const Maps = () => {
  //style 
  let classes = useStyles();

  //local
  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [infoWindow, setInfoWindow] = useState(null)

  //hooks
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  //service data
  const businesses = useGetService(BACK_ROUTES.BUSINESS, CACHED_DATA_ROUTES.DASH_MAP_BUSINESSES, requestParams)
  const events = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.DASH_MAP_EVENTS, requestParams)
  const points = useGetService(BACK_ROUTES.POINTS, CACHED_DATA_ROUTES.DASH_MAP_POINTS, requestParams)

  //lifecycle
  useEffect(() => {
    if (!businesses.loading && !events.loading && !points.loading) {
      sortDataForMap(businesses, events, points, setData)
    }
  }, [businesses, events, points])

  const handleSelectedCategory = (category) => {
    setSelectedCategory(category)
    setInfoWindow(null)
  }

  return (
    <div className={classes.container}>
      <PageTitle title={term('map')} />
      {data ?
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
            <MapPick
              containerStyle={{ width: '100vw', height: '55vh' }}
              markers={selectedCategory ? data[selectedCategory] : [...data.culture, ...data.food, ...data.travel, ...data.local, ...data.lodging, ...data.attraction]}
              initialZoom={8}
              isLoaded={isLoaded}
              setInfoWindow={setInfoWindow}
              infoWindow={infoWindow}
              selectedCategory={selectedCategory}
            />
          </div>
          <Grid container
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch" spacing={2}>
            {config.MetroStats.map((stat) => (
              <Grid item lg={1} md={12} sm={12} xs={12} key={stat.product}>
                <MetroStats
                  setSelectedCategory={handleSelectedCategory}
                  selectedCategory={selectedCategory}
                  ammount={data[stat.svg].length}
                  svg={stat.svg}
                  title={stat.product}
                  clickable={true}
                />
              </Grid>
            ))}
          </Grid>
        </> :
        <div className={classes.progressContainer}>
          <CircularProgress size={100} />
        </div>
      }
    </div>
  );
}

export default React.memo(Maps);