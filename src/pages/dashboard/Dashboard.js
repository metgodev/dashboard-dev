import React, { useEffect, useState } from "react";
// MUI
import { Grid } from "@material-ui/core";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Calendar from "../../components/Calendar/Calendar";
import BigChart from "../../components/BigChart/BigChart";
import BigStat from "../../components/BigStat/BigStat";
import term from "../../terms";
import config from "../../config";
import MetroStats from "../../components/MetroStats/MetroStats";
import Download from "../../components/Download/Download";
//Service
import useGetService from '../../hooks/useGetService'
//Helper
import { headerBtns, requestParams } from "./dashboardHelpers";
import { sortDataForMap } from "../maps/mapsHelpers";
import BACK_ROUTES from '../../data/back_routes'
import CACHED_DATA_ROUTES from '../../data/cached_data_routes'

export default function Dashboard() {

  const [entitiesCount, setEntitiesCount] = useState({
    businesses: [],
    events: [],
    points: [],
    tracks: []
  })

  const [tagCategoriesData, setTagCategoriesData] = useState(null)

  const businesses = useGetService(BACK_ROUTES.BUSINESS, CACHED_DATA_ROUTES.DASH_MAP_BUSINESSES, requestParams)
  const events = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.DASH_MAP_EVENTS, requestParams)
  const points = useGetService(BACK_ROUTES.POINTS, CACHED_DATA_ROUTES.DASH_MAP_POINTS, requestParams)
  const tracks = useGetService(BACK_ROUTES.TRACKS, CACHED_DATA_ROUTES.DASH_MAP_TRACKS, requestParams)

  useEffect(() => {
    if (!businesses.loading && !events.loading && !points.loading && !tracks.loading) {
      setEntitiesCount({ businesses: businesses.data, events: events.data, points: points.data, tracks: tracks.data })
      sortDataForMap(businesses, events, points, setTagCategoriesData)
    }
  }, [businesses, events, points, tracks])

  return (
    <>
      <PageTitle calendar title={term('dashboard')} buttonGroup={{ btns: headerBtns }} />
      <Grid container spacing={2}>
        <Grid item lg={6} md={5} sm={12} xs={12}>
          <Calendar events={events} type={1} warp={true} />
        </Grid>
        <Grid item lg={6} md={7} sm={12} xs={12}>
          <BigChart />
        </Grid>
        {config.bigStat.map((stat, index) => (
          <Grid item lg={3} md={3} sm={6} xs={12} key={stat.product}>
            <BigStat
              type={term(stat.product)}
              data={entitiesCount[stat.product]}
            />
          </Grid>
        ))}
        <Grid container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch" spacing={2}>
          {config.MetroStats.map(stat => (
            <Grid item lg={1} md={12} sm={12} xs={12} key={stat.product}>
              <MetroStats
                ammount={tagCategoriesData === null ? 0 : tagCategoriesData[stat.svg].length}
                svg={stat.svg}
                title={stat.product}
                clickable={false}
              />
            </Grid>
          ))}
          {/* <Grid item lg={2} md={12} sm={12} xs={12}>
            <Download />
          </Grid> */}
        </Grid>
      </Grid>
    </>
  );
}


