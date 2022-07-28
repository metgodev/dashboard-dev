import React, { useEffect, useState } from "react";
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
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import client from '../../API/metro'

export default function Dashboard() {

  //const { _get_service, cancel_requests, is_cached, cache, error, loading, data } = useGetService()
  const [entitiesCount, setEntitiesCount] = useState([
    0, 0, 0, 0
  ])

  let headerBtns = [
    //can get name, func, input, icon 
    { name: term('daily'), func: () => console.log('Days'), buttonIcon: <TodayOutlinedIcon /> },
    { name: term('weekly'), func: () => console.log('Week'), buttonIcon: <DateRangeOutlinedIcon /> },
    { name: term('monthly'), func: () => console.log('Months'), buttonIcon: <CalendarTodayOutlinedIcon /> },
  ]

  const getEntitiesCount = async () => {
    const res = await Promise.all([
      client.service("business").find({ query: { $limit: 0 } }),
      client.service("events").find({ query: { $limit: 0 } }),
      client.service("pois").find({ query: { $limit: 0 } }),
      client.service("tracks").find({ query: { $limit: 0 } })
    ])
    setEntitiesCount([res[0].total, res[1].total, res[2].total, res[3].total])
  }

  useEffect(() => {
    getEntitiesCount()
  }, [])

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


