import React from "react";
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

export default function Dashboard() {
  let headerBtns = [
    //can get name, func, input, icon 
    { name: term('daily'), func: () => console.log('Days') ,  buttonIcon: <TodayOutlinedIcon />},
    { name: term('weekly'), func: () => console.log('Week') , buttonIcon: <DateRangeOutlinedIcon />},
    { name: term('monthly'), func: () => console.log('Months'),  buttonIcon: <CalendarTodayOutlinedIcon /> },
  ]

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
        {config.bigStat.map(stat => (
          <Grid item lg={3} md={3} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
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


