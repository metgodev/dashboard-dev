import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MetroStats from "../../components/MetroStats/MetroStats";
import PageTitle from "../../components/PageTitle/PageTitle";
import config from "../../config";
import term from "../../terms";
import MapPick from '../../components/MapPicker.js/MapPick'
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader } from '@react-google-maps/api';
// styles
import useStyles from "./styles";
import useGetWindowSize from '../../hooks/useGetWindowSize'
import useGetService from "../../hooks/useGetService";
import { requestParams, sortDataByCategory } from "./mapsHelpers";
const { REACT_APP_GOOGLE_API_KEY } = process.env

const Maps = () => {
  //style 
  let classes = useStyles();
  //local
  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { width } = useGetWindowSize()
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  const businesses = useGetService("business", requestParams)
  const events = useGetService("events", requestParams)
  const points = useGetService("pois", requestParams)

  useEffect(() => {
    if (!businesses.loading && !events.loading && !points.loading) {
      let data = [...businesses.data, ...events.data, ...points.data]
      data = data.filter(item => item.tags && item.tags[0] && item.tags[0].category)
      data = data.map(item => {
        return (
          {
            category: item.tags[0].category.title,
            location: item?.location?.coordinates ? item?.location?.coordinates : item?.locationInfo?.coordinates ? item?.locationInfo.coordinates : [0, 0]
          }
        )
      })
      sortDataByCategory(data, setData)
    }
  }, [businesses, events, points])

  return (
    <div className={classes.container}>
      <PageTitle title={term('map')} />
      {data ?
        <>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '20px' }}>
            <MapPick
              containerStyle={{ width: width - 300, height: '55vh' }}
              markers={selectedCategory ? data[selectedCategory] : [...data.culture, ...data.food, ...data.travel, ...data.local, ...data.lodging, ...data.attraction]}
              zoom={8}
              isLoaded={isLoaded}
            />
          </div>
          <Grid container
            direction="row"
            justifyContent="space-evenly"
            alignItems="stretch" spacing={2}>
            {config.MetroStats.map((stat) => (
              <Grid item lg={1} md={12} sm={12} xs={12} key={stat.product}>
                <MetroStats
                  setSelectedCategory={setSelectedCategory}
                  ammount={data[stat.svg].length}
                  svg={stat.svg}
                  title={stat.product} />
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

export default Maps;