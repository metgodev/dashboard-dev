import React from "react";
import { Grid, } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { LineChart, Line, } from "recharts";
// styles
import useStyles from ".styles";
// components
import Widget from "../components/Widget/Widget";
import { Typography } from "../components/Wrappers/Wrappers";


function StatsBox() {
    let classes = useStyles();
    let theme = useTheme();

    return (
        <Widget
            title="Visits Today"
            uppertitle
            bodyClass={classes.fullHeightBody}
            className={classes.card}
        >
            <div className={classes.visitsNumberContainer}>
                <Typography size="xl" weight="medium">
                    12, 678
                </Typography>
                <LineChart
                    width={55}
                    height={30}
                    data={[
                        { value: 10 },
                        { value: 15 },
                        { value: 10 },
                        { value: 17 },
                        { value: 18 },
                    ]}
                    margin={{ left: theme.spacing(2) }}
                >
                    <Line
                        type="natural"
                        dataKey="value"
                        stroke={theme.palette.success.main}
                        strokeWidth={2}
                        dot={false}
                    />
                </LineChart>
            </div>
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                        {term('registrations')}
                    </Typography>
                    <Typography size="md">860</Typography>
                </Grid>
                <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                        {term('sign_out')}
                    </Typography>
                    <Typography size="md">32</Typography>
                </Grid>
                <Grid item>
                    <Typography color="text" colorBrightness="secondary">
                        {term('rate')}
                    </Typography>
                    <Typography size="md">3.25%</Typography>
                </Grid>
            </Grid>
        </Widget>
    )
}

export default StatsBox

