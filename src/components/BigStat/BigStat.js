import React, { useState } from "react";
import { Grid, Select, MenuItem, Input } from "@material-ui/core";
import { ArrowForward as ArrowForwardIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { BarChart, Bar } from "recharts";
import classnames from "classnames";
import term from "../../terms";
// styles
import useStyles from "./styles";

// components
import { Typography } from "../Wrappers/Wrappers";
import Widget from "../Widget/Widget";

export default function BigStat({ product, total, color, registrations }) {
  let classes = useStyles();
  let theme = useTheme();

  // local
  let [value, setValue] = useState("daily");

  return (
    <Widget
      header={
        <div className={classes.title}>
          <Typography variant="h5">{product}</Typography>

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
      uppertitle
    >
      <div className={classes.totalValueContainer}>
        <div className={classes.totalValue}>
          <Typography size="xxl" color="text" colorBrightness="secondary">
            {total.count}
          </Typography>
        </div>
        <BarChart width={100} height={50} data={getRandomData()}>
          <Bar
            dataKey="value"
            fill={theme.palette[color].main}
            radius={10}
            barSize={10}
          />
        </BarChart>
      </div>
      <div className={classes.bottomStatsContainer}>
        <div className={classnames(classes.statCell, classes.borderRight)}>
          <Grid container alignItems="center">
            <Typography color={total.percent.profit ? "secondary" : "default"}>
              &nbsp;{total.percent.profit ? "+" : "-"}
              {total.percent.value}%
            </Typography>
            <ArrowForwardIcon
              className={classnames(classes.profitArrow, {
                [classes.profitArrowDanger]: !registrations[value].profit,
              })}
            />
            <Typography size="sm" color="text" colorBrightness="secondary">
              {term('last_then_year')}
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
