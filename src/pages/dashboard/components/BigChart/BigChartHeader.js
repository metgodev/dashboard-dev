import React, { useState } from "react";
import { Select, OutlinedInput, MenuItem, } from "@material-ui/core";
// styles
import useStyles from "../../styles";
// components
import { Typography } from "../../../../components/Wrappers/Wrappers";
import Dot from "../../../../components/Dot/Dot";
import term from "../../../../terms";


function BigChartHeader() {
    let classes = useStyles();

    //local
    let [mainChartState, setMainChartState] = useState("monthly");

    return (
        <div className={classes.mainChartHeader}>
            <Typography
                variant="h5"
                color="text"
                colorBrightness="secondary"
            >
                {term('daily_line_chart')}
            </Typography>
            <div className={classes.mainChartHeaderLabels}>
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
            </div>
            <Select
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
                <MenuItem value="daily">{term('daily')}</MenuItem>
                <MenuItem value="weekly">{term('weekly')}</MenuItem>
                <MenuItem value="monthly">{term('monthly')}</MenuItem>
            </Select>
        </div>
    )
}

export default BigChartHeader
