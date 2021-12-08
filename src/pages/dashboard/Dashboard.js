import React from "react";
import { Grid } from "@material-ui/core";
// styles
import useStyles from "./styles";
// components
import mock from "./mock";
import Widget from "../../components/Widget/Widget";
import PageTitle from "../../components/PageTitle/PageTitle";
import Table from "./components/Table/Table";
import BigStat from "./components/BigStat/BigStat";
import StatsBox from "./components/SmallCharts/StatsBox";
import StatsBoxLinear from "./components/SmallCharts/StatsBoxLinear";
import StatsBoxGraph from "./components/SmallCharts/StatsBoxGraph";
import StatsBoxPieChart from "./components/SmallCharts/StatsBoxPieChart";
import Calendar from "./components/Calendar/Calendar";
import BigChart from "./components/BigChart/BigChart";


export default function Dashboard() {
  let classes = useStyles();

  return (
    <>
      <PageTitle title="Dashboard" switch="true" />
      <Grid container spacing={2}>
        <Grid item lg={8} md={7} sm={12} xs={12}>
          <BigChart />
        </Grid>
        <Grid item lg={4} md={5} sm={12} xs={12}>
          <Calendar />
        </Grid>

        {mock.bigStat.map(stat => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={stat.product}>
            <BigStat {...stat} />
          </Grid>
        ))}
        
        <Grid item lg={3} md={4} sm={6} xs={12}>
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
            <Table data={mock.table} />
          </Widget>
        </Grid>
      </Grid>
    </>
  );
}


