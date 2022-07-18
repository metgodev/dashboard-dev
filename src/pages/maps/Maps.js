import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import MetroStats from "../../components/MetroStats/MetroStats";
import PageTitle from "../../components/PageTitle/PageTitle";
import config from "../../config";
import term from "../../terms";
import MapPick from '../../components/MapPicker.js/MapPick.js'
import client from '../../API/metro'
import CircularProgress from '@mui/material/CircularProgress';
import { useJsApiLoader } from '@react-google-maps/api';
// styles
import useStyles from "./styles";
//svgs
import attraction from '../../Assets/svgs/attraction.svg'
import culture from '../../Assets/svgs/culture.svg'
import food from '../../Assets/svgs/food.svg'
import local from '../../Assets/svgs/local.svg'
import lodging from '../../Assets/svgs/lodging.svg'
import travel from '../../Assets/svgs/travel.svg'

import attractionIcon from '../../Assets/images/icons/attractions.png'
import cultureIcon from '../../Assets/images/icons/culture.png'
import foodIcon from '../../Assets/images/icons/food.png'
import localIcon from '../../Assets/images/icons/local.png'
import lodgingIcon from '../../Assets/images/icons/lodging.png'
import travelIcon from '../../Assets/images/icons/travel.png'

export default function Maps() {

  let classes = useStyles();

  const { REACT_APP_GOOGLE_API_KEY } = process.env
  const { isLoaded } = useJsApiLoader({ libraries: ["places"], id: 'google-map-script', googleMapsApiKey: REACT_APP_GOOGLE_API_KEY })

  const [data, setData] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState(null)
  let svgArr = [{ attraction }, { culture }, { food }, { local }, { lodging }, { travel }];
  let img = svgArr.find(s => Object.keys(s)[0] == selectedCategory && s)

  useEffect(() => {
    let businesses = client.service("business").find({ query: { $limit: 135 } })
    let points = client.service("pois").find({ query: { $limit: 135 } });
    let events = client.service("events").find({ query: { $limit: 135 } });
    Promise.all([businesses, points, events])
      .then(res => {
        return ([...res[0].data, ...res[1].data, ...res[2].data])
      })
      .then(res => res.filter(item => item.tags && item.tags[0] && item.tags[0].category))
      .then(res => {
        return res.map(item => {
          return (
            { category: item.tags[0].category.title, location: item.location.coordinates }
          )
        })
      })
      .then(res => {
        sortDataByCategory(res)
      })

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
          <MapPick
            containerStyle={{ width: '100%', height: '60vh' }}
            markers={selectedCategory ? data[selectedCategory] : [...data.culture, ...data.food, ...data.travel, ...data.local, ...data.lodging, ...data.attraction]}
            zoom={8}
            isLoaded={isLoaded}
          />
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
