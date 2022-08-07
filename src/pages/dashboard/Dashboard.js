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
//Helper functions
import { headerBtns, requestParams } from "./dashboardHelpers";
import { sortDataForMap } from "../maps/mapsHelpers";

export default function Dashboard() {

  const [entitiesCount, setEntitiesCount] = useState({
    businesses: [],
    events: [],
    points: [],
    tracks: []
  })
  const [tagCategoriesData, setTagCategoriesData] = useState(null)

  const businesses = useGetService("business", "businessDashMap", requestParams)
  const events = useGetService("events", "eventsDashMap", requestParams)
  const points = useGetService("pois", "pointsDashMap", requestParams)
  const tracks = useGetService("tracks", "tracksDashMap", requestParams)

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
        <Grid item lg={4} md={5} sm={12} xs={12}>
          <Calendar type={1} warp={true} />
        </Grid>
        <Grid item lg={8} md={7} sm={12} xs={12}>
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
          <Grid item lg={2} md={12} sm={12} xs={12}>
            <Download />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}


