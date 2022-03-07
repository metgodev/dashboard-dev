import React from 'react';
import { Box } from '@material-ui/core';


export default function TabPanel({ children, value, index, ...other }) {

    return (
        <div
            style={{ overflowX: 'hidden' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>{children}</Box>
            )}
        </div>
    );
}
