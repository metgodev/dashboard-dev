import React, { useState } from "react";
import { Select, OutlinedInput, MenuItem, } from "@material-ui/core";
// styles
import useStyles from "../../styles";
// components
import { Typography } from "../../../../components/Wrappers/Wrappers";
import Dot from "../../../../components/Dot/Dot";

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
                Daily Line Chart
            </Typography>
            <div className={classes.mainChartHeaderLabels}>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="warning" />
                    <Typography className={classes.mainChartLegentElement}>
                        Tablet
                    </Typography>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                        Mobile
                    </Typography>
                </div>
                <div className={classes.mainChartHeaderLabel}>
                    <Dot color="primary" />
                    <Typography className={classes.mainChartLegentElement}>
                        Desktop
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
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
        </div>
    )
}

export default BigChartHeader
