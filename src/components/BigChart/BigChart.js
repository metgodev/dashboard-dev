import React, { useState } from "react";
import { useTheme } from "@material-ui/styles";
import { ResponsiveContainer, Line, YAxis, XAxis, Tooltip, CartesianGrid, LineChart, Legend } from "recharts";
// styles
import useStyles from "./styles";
// components
import Widget from "../Widget/Widget";
import BigChartHeader from "./BigChartHeader";
import { getFormattedData } from "./config";
import { useEffect } from "react";
import term from "../../terms";
import { CircularProgress } from "@material-ui/core";

export default function BigChart({ data }) {

    let classes = useStyles();
    let theme = useTheme();

    const [activeUsersData, setActiveUsersData] = useState(null);

    useEffect(() => {
        if (data) {
            setActiveUsersData(getFormattedData(data))
        }
    }, [data])

    return (
        <Widget bodyClass={classes.mainChartBody} header={<BigChartHeader />} height={'370px'}>
            {activeUsersData ? <div style={{ direction: "ltr" }}>
                <ResponsiveContainer height={300}>
                    <LineChart
                        data={activeUsersData}
                        margin={{
                            top: 10,
                            right: 30,
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
                            name={term('users')}
                            stroke={theme.palette.graphlineorange.main}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
                :
                <div style={{ width: '100%', height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </div>
            }
        </Widget>
    )
}