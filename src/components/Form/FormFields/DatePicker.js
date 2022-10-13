import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from 'mui-rff'

function MyDatePicker({ title, field, disabled }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={title}
                name={field}
                inputFormat={'dd/MM/yyyy'}
                disabled={disabled}
            />
        </LocalizationProvider >
    )
}

export default MyDatePicker