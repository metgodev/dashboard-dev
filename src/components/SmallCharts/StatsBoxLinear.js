import React from "react";
import { LinearProgress } from "@material-ui/core";
// styles
import useStyles from ".styles";
// components
import Widget from "../components/Widget/Widget";
import { Typography } from "../components/Wrappers/Wrappers";
import Dot from "../components/Dot/Dot";


function StatsBoxLinear() {
    let classes = useStyles();

    return (
        <Widget
            title="App Performance"
            upperTitle
            className={classes.card}
            bodyClass={classes.fullHeightBody}
        >
            <div className={classes.performanceLegendWrapper}>
                <div className={classes.legendElement}>
                    <Dot color="warning" />
                    <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.legendElementText}
                    >
                        Integration
                    </Typography>
                </div>
                <div className={classes.legendElement}>
                    <Dot color="primary" />
                    <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.legendElementText}
                    >
                        SDK
                    </Typography>
                </div>
            </div>
            <div className={classes.progressSection}>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    Integration
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={30}
                    classes={{ barColorPrimary: classes.progressBar }}
                    className={classes.progress}
                />
            </div>
            <div>
                <Typography
                    size="md"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                >
                    SDK
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={55}
                    classes={{ barColorPrimary: classes.progressBar }}
                    className={classes.progress}
                />
            </div>
        </Widget>
    )
}

export default StatsBoxLinear
