import React from 'react';
import { Box } from '@material-ui/core';


export default function TabPanel({ children, value, index, ...other }) {

    return (
        <div
            style={{ overflowX: 'hidden', height: '100%' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box style={{ height: '90%' }}>{children}</Box>
            )}
        </div>
    );
}
