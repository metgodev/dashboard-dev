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
            title={term(app_performance)}
            uppertitle
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
                        {term('integration')}
                    </Typography>
                </div>
                <div className={classes.legendElement}>
                    <Dot color="primary" />
                    <Typography
                        color="text"
                        colorBrightness="secondary"
                        className={classes.legendElementText}
                    >
                        {term('SDK')}
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
                    {term('integration')}
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
                    {term('SDK')}
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
