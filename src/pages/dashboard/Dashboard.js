import React from "react";
import { Grid } from "@material-ui/core";
// styles
import useStyles from "./styles";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Calendar from "../../components/Calendar/Calendar";
import BigChart from "../../components/BigChart/BigChart";
import BigStat from "../../components/BigStat/BigStat";
import term from "../../terms";
import config from "./config";
import MetroStats from "../../components/MetroStats/MetroStats";

export default function Dashboard() {
  let headerBtns = [
    { name: term('daily'), func: () => console.log('Days') },
    { name: term('weekly'), func: () => console.log('Week') },
    { name: term('monthly'), func: () => console.log('Months') },
  ]

  return (
    <>
      <PageTitle title={term('dashboard')} buttonGroup={{ btns: headerBtns }} />
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
          <Grid item lg={4} md={12} sm={12} xs={12}>
            <h1 style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>DOWNLOAD</h1>
          </Grid>
        </Grid>
        {/* show case */}
        {/* <Grid item lg={3} md={4} sm={6} xs={12}>
          <StatsBox />
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <StatsBoxLinear />
        </Grid>
        <Grid item lg={3} md={8} sm={6} xs={12}>
          <StatsBoxGraph />
        </Grid>
        <Grid item lg={3} md={4} sm={6} xs={12}>
          <StatsBoxPieChart />
        </Grid>
        <Grid item xs={12}>
          <Widget
            title="Support Requests"
            upperTitle
            noBodyPadding
            bodyClass={classes.tableWidget}
          >
            <Table data={config.table} />
          </Widget>
        </Grid> */}
        {/* show case */}
      </Grid>
    </>
  );
}


