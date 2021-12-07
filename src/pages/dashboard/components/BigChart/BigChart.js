import React from "react";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, Line, YAxis, XAxis, Tooltip, CartesianGrid, LineChart, Legend } from "recharts";
// styles
import useStyles from "../../styles";
// components
import Widget from "../../../../components/Widget/Widget";
import BigChartHeader from "./BigChartHeader";

const lineChartData = [
    {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400,
    },
    {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210,
    },
    {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290,
    },
    {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000,
    },
    {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181,
    },
    {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500,
    },
    {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100,
    },
];


export default function BigChart() {
    let classes = useStyles();
    let theme = useTheme();

    return (
        <Widget bodyClass={classes.mainChartBody} header={<BigChartHeader />}>
            <ResponsiveContainer width="100%" minWidth={150} height={350}>
                <LineChart
                    width={500}
                    height={300}
                    data={lineChartData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="1 1" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="pv"
                        stroke={theme.palette.primary.main}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="uv"
                        stroke={theme.palette.info.main}
                    />
                </LineChart>
            </ResponsiveContainer>
        </Widget>
    )
}

