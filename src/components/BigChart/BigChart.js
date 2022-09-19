import React from "react";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, Line, YAxis, XAxis, Tooltip, CartesianGrid, LineChart, Legend } from "recharts";
// styles
import useStyles from "./styles";
// components
import Widget from "../Widget/Widget";
import BigChartHeader from "./BigChartHeader";
import { lineChartData } from "./config";
import useGetWindowSize from '../../hooks/useGetWindowSize'

export default function BigChart() {

    let classes = useStyles();
    let theme = useTheme();

    const { height, width } = useGetWindowSize()

    return (
        <Widget bodyClass={classes.mainChartBody} header={<BigChartHeader />} height={'42vh'}>
            <div style={{ direction: "ltr" }}>
                <ResponsiveContainer width="100%" height={height / 3.2}>
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
                            name="צפיות"
                            stroke={theme.palette.graphlineorange.main}
                            activeDot={{ r: 8 }}
                        />
                        <Line
                            type="monotone"
                            dataKey="uv"
                            name="משתמשים"
                            stroke={theme.palette.graphlinegreen.main}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Widget>
    )
}

