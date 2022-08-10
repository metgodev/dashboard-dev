import React, { useState, useCallback } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import term from "../../terms";
import { getNumberOfEntities, getTextForComparison } from './bigStatHelper'
import CircularProgress from '@mui/material/CircularProgress';
// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";
import Widget from "../Widget/Widget";

export default function BigStat({ type, data }) {
  let classes = useStyles();

  // local
  let [value, setValue] = useState("daily");

  const useGetNumberOfEntitiesBasedOnTimePeriod = useCallback((timePeriod) => {
    if (data.length === 0) {
      return (
        <CircularProgress size={10} />
      )
    } else {
      return getNumberOfEntities(timePeriod, data);
    }
  }, [value, data])

  const useGetTextForComparison = useCallback((value) => {
    return getTextForComparison(value)
  }, [value])

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">{type}</Typography>

          <Select
            value={value}
            onChange={e => setValue(e.target.value)}
            input={
              <Input
                disableUnderline
                classes={{ input: classes.selectInput }}
              />
            }
            className={classes.select}
          >
            <MenuItem value="daily">{term('daily')}</MenuItem>
            <MenuItem value="weekly">{term('weekly')}</MenuItem>
            <MenuItem value="monthly">{term('monthly')}</MenuItem>
          </Select>
        </div>
      }
    >
      <div className={classes.totalValueContainer}>
        {data.length > 0 ?
          <>
            <div className={classes.totalValue}>
              <Typography size="xxl" color="text" colorBrightness="secondary">
                {data.length}
              </Typography>
            </div>
            <BarChart width={100} height={50} data={getRandomData()}>
              <Bar
                dataKey="value"
                fill={
                  'green'
                }
                radius={10}
                barSize={10}
              />
            </BarChart>
          </>
          : <div className={classes.spinner}><CircularProgress size={50} /></div>}
      </div>
      <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography marginLeft={"5px"} color="text" >
              {useGetNumberOfEntitiesBasedOnTimePeriod(value)}
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow)}
            />
            <Typography size="sm" color="text" colorBrightness="secondary">
              {useGetTextForComparison(value)}
            </Typography>
          </Grid>
        </div>
      </div>
    </Widget>
  );
}

// #######################################################################

function getRandomData() {
  return Array(7)
    .fill()
    .map(() => ({ value: Math.floor(Math.random() * 10) + 1 }));
}
