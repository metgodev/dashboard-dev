import { Box } from '@mui/material';
import React from 'react'
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import term from '../../../../terms';

export const StatisticsTab = () => {

    const data = [
        {
            "name": term('sunday'),
            'clicks': 4000,
            "share": 2400,
            'socialMedia': 1500,
            'calls': 20
        },
        {
            "name": term('monday'),
            "clicks": 3000,
            "share": 1398,
            'socialMedia': 3200,
            'calls': 56
        },
        {
            "name": term('tuesday'),
            "clicks": 2000,
            "share": 6500,
            'socialMedia': 5000,
            'calls': 16
        },
        {
            "name": term('wednesday'),
            "clicks": 2780,
            "share": 3908,
            'socialMedia': 700,
            'calls': 150
        },
        {
            "name": term('thursday'),
            "clicks": 1890,
            "share": 4800,
            'socialMedia': 6500,
            'calls': 56
        },
        {
            "name": term('friday'),
            "clicks": 2390,
            "share": 3800,
            'socialMedia': 200,
            'calls': 89
        },
        {
            "name": term('saturday'),
            "clicks": 3490,
            "share": 4300,
            'socialMedia': 2000,
            'calls': 568
        }
    ]

    return (
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '50vh' }}>
            <BarChart
                width={900}
                height={400}
                data={data}
                barCategoryGap={'20%'}
                barGap={5}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clicks" name={term('enters')} fill="#00A1FD" />
                <Bar dataKey="share" name={term('share')} fill="#5EF924" />
                <Bar dataKey="socialMedia" name={term('social_media')} fill="#FDB800" />
                <Bar dataKey="calls" name={term('calls')} fill="#E936FB" />
            </BarChart>
        </Box>
    )
}
