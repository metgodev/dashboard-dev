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
import { headerBtns, requestParams, setNumberOfBusinesses, setNumberOfEvents, setNumberOfPoints, setNumberOfTracks } from "./dashboardHelpers";

export default function Dashboard() {

  const [entitiesCount, setEntitiesCount] = useState([
    0, 0, 0, 0
  ])

  const businesses = useGetService("business", requestParams)
  const events = useGetService("events", requestParams)
  const points = useGetService("pois", requestParams)
  const tracks = useGetService("tracks", requestParams)

  useEffect(() => {
    setNumberOfBusinesses(businesses, setEntitiesCount)
    setNumberOfEvents(events, setEntitiesCount)
    setNumberOfPoints(points, setEntitiesCount)
    setNumberOfTracks(tracks, setEntitiesCount)
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
            <BigStat product={stat.product} total={{ ...stat.total, count: entitiesCount[index] }} color={stat.color} registrations={stat.registrations} />
          </Grid>
        ))}
        <Grid container
          direction="row"
          justifyContent="space-evenly"
          alignItems="stretch" spacing={2}>
          {config.MetroStats.map(stat => (
            <Grid item lg={1} md={12} sm={12} xs={12} key={stat.product}>
              <MetroStats {...stat} />
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


