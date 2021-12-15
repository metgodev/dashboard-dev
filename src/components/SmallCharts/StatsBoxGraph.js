import React from "react";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, AreaChart, Area, } from "recharts";
// styles
import useStyles from ".styles";
// components
import Widget from "../components/Widget/Widget";
import { Typography } from "../components/Wrappers/Wrappers";


function getRandomData(length, min, max, multiplier = 10, maxDiff = 10) {
    let array = new Array(length).fill();
    let lastValue;

    return array.map((item, index) => {
        let randomValue = Math.floor(Math.random() * multiplier + 1);

        while (
            randomValue <= min ||
            randomValue >= max ||
            (lastValue && randomValue - lastValue > maxDiff)
        ) {
            randomValue = Math.floor(Math.random() * multiplier + 1);
        }

        lastValue = randomValue;

        return { value: randomValue };
    });
}

function StatsBoxGraph() {
    let classes = useStyles();
    let theme = useTheme();

    return (
        <Widget
            title="Server Overview"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
        >
            <div className={classes.serverOverviewElement}>
                <Typography
                    color="text"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                >
                    60% / 37°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                    <ResponsiveContainer height={50} width="99%">
                        <AreaChart data={getRandomData(10)}>
                            <Area
                                type="natural"
                                dataKey="value"
                                stroke={theme.palette.secondary.main}
                                fill={theme.palette.secondary.light}
                                strokeWidth={2}
                                fillOpacity="0.25"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={classes.serverOverviewElement}>
                <Typography
                    color="text"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                >
                    54% / 31°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                    <ResponsiveContainer height={50} width="99%">
                        <AreaChart data={getRandomData(10)}>
                            <Area
                                type="natural"
                                dataKey="value"
                                stroke={theme.palette.primary.main}
                                fill={theme.palette.primary.light}
                                strokeWidth={2}
                                fillOpacity="0.25"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={classes.serverOverviewElement}>
                <Typography
                    color="text"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                >
                    57% / 21°С / 3.3 Ghz
                </Typography>
                <div className={classes.serverOverviewElementChartWrapper}>
                    <ResponsiveContainer height={50} width="99%">
                        <AreaChart data={getRandomData(10)}>
                            <Area
                                type="natural"
                                dataKey="value"
                                stroke={theme.palette.warning.main}
                                fill={theme.palette.warning.light}
                                strokeWidth={2}
                                fillOpacity="0.25"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </Widget>
    )
}

export default StatsBoxGraph
