import React, { useState } from "react";
import { Select, OutlinedInput, MenuItem, } from "@material-ui/core";
// styles
import useStyles from "./styles";
// components
import { Typography } from "../Wrappers/Wrappers";
import Dot from "../Dot/Dot";
import term from "../../terms";
import TIME_PERIODS from "../../data/time_periods";


function BigChartHeader() {
    let classes = useStyles();

    //local
    let [mainChartState, setMainChartState] = useState(TIME_PERIODS.MONTHLY);

    return (
        <div className={classes.mainChartHeader} >
            <Typography
                variant="h5"
                color="text"
                colorBrightness="secondary"
            >
                {term('weekly_line_chart')}
            </Typography>
            {/* <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                        {term('tablet')}
                    </Typography>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                        {term('mobile')}
                    </Typography>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                        {term('desktop')}
                    </Typography>
                </div>
            </div> */}
            {/* <Select
                value={mainChartState}
                onChange={e => setMainChartState(e.target.value)}
                input={
                    <OutlinedInput
                        labelWidth={0}
                        classes={{
                            notchedOutline: classes.mainChartSelectRoot,
                            input: classes.mainChartSelect,
                        }}
                    />
                }
                autoWidth
            >
                <MenuItem value={TIME_PERIODS.DAILY}>{term('daily')}</MenuItem>
                <MenuItem value={TIME_PERIODS.WEEKLY}>{term('weekly')}</MenuItem>
                <MenuItem value={TIME_PERIODS.MONTHLY}>{term('monthly')}</MenuItem>
            </Select> */}
        </div>
    )
}

export default BigChartHeader
