import React from "react";
import { Grid } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, PieChart, Pie, Cell, } from "recharts";
// styles
import useStyles from ".styles";
// components
import Widget from "../components/Widget/Widget";
import { Typography } from "../components/Wrappers/Wrappers";
import Dot from "../components/Dot/Dot";
import term from "../../terms";

const PieChartData = [
    { name: "Group A", value: 400, color: "primary" },
    { name: "Group B", value: 300, color: "secondary" },
    { name: "Group C", value: 300, color: "warning" },
    { name: "Group D", value: 200, color: "success" },
];

function StatsBoxPieChart() {
    let classes = useStyles();
    let theme = useTheme();

    return (
        <Widget title={term(revenue_breakdown)} uppertitle className={classes.card}>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <ResponsiveContainer width="100%" height={144}>
                        <PieChart margin={{ left: theme.spacing(2) }}>
                            <Pie
                                data={PieChartData}
                                innerRadius={45}
                                outerRadius={60}
                                dataKey="value"
                            >
                                {PieChartData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={theme.palette[entry.color].main}
                                    />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </Grid>
                <Grid item xs={6}>
                    <div className={classes.pieChartLegendWrapper}>
                        {PieChartData.map(({ name, value, color }, index) => (
                            <div key={color} className={classes.legendItemContainer}>
                                <Dot color={color} />
                                <Typography style={{ whiteSpace: "nowrap" }}>
                                    &nbsp;{name}&nbsp;
                                </Typography>
                                <Typography color="text" colorBrightness="secondary">
                                    &nbsp;{value}
                                </Typography>
                            </div>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Widget>
    )
}

export default StatsBoxPieChart
