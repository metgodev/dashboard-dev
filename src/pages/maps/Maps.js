import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MetroStats from "../../components/MetroStats/MetroStats";
import PageTitle from "../../components/PageTitle/PageTitle";
import config from "../../config";
import term from "../../terms";
import MapPick from '../../components/MapPicker.js/MapPick'
import client from '../../API/metro'
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader } from '@react-google-maps/api';
// styles
import useStyles from "./styles";
//png
import attractionIcon from '../../Assets/images/icons/attractions.png'
import cultureIcon from '../../Assets/images/icons/culture.png'
import foodIcon from '../../Assets/images/icons/food.png'
import localIcon from '../../Assets/images/icons/local.png'
import lodgingIcon from '../../Assets/images/icons/lodging.png'
import travelIcon from '../../Assets/images/icons/travel.png'
import useGetWindowSize from '../../hooks/useGetWindowSize'

const { REACT_APP_GOOGLE_API_KEY } = process.env

const Maps = () => {
  //style 
  let classes = useStyles();
  //local
  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const { width, height } = useGetWindowSize()

  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  useEffect(() => {
    (async () => {
      try {
        let businesses = await client.service("business").find({ query: { $limit: 135, status: 'PUBLIC' } })
        let points = await client.service("pois").find({ query: { $limit: 135, status: 'PUBLIC' } });
        let events = await client.service("events").find({ query: { $limit: 135, status: 'PUBLIC' } });
        let data = [...businesses.data, ...points.data, ...events.data]
        data = data.filter(item => item.tags && item.tags[0] && item.tags[0].category)
        data = data.map(item => {
          return (
            { category: item.tags[0].category.title, location: item.location.coordinates }
          )
        })
        sortDataByCategory(data)
      } catch (err) {
        console.log(err, 'error by fetching data in map')
      }
    })()
  }, [])

  const sortDataByCategory = (data) => {

    let culture = []
    let food = []
    let local = []
    let attraction = []
    let lodging = []
    let travel = []

    data.forEach(item => {
      switch (item.category) {
        case "Travel":
          travel.push({ location: item.location, icon: travelIcon })
          break;
        case "Food":
          food.push({ location: item.location, icon: foodIcon })
          break;
        case "Local":
          local.push({ location: item.location, icon: localIcon })
          break;
        case "Attraction":
          attraction.push({ location: item.location, icon: attractionIcon })
          break;
        case "Culture":
          culture.push({ location: item.location, icon: cultureIcon })
          break;
        case "Lodging":
          lodging.push({ location: item.location, icon: lodgingIcon })
          break;
      }
    })

    setData(
      {
        culture: culture,
        food: food,
        travel: travel,
        local: local,
        lodging: lodging,
        attraction: attraction
      })
  }

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