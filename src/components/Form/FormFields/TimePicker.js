import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TimePicker } from 'mui-rff'

function MyTimePicker({ title, field }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                label={title}
                name={field}
                closeOnSelect={true}
                ampm={false}
            />
        </LocalizationProvider>
    )
}

export default MyTimePicker