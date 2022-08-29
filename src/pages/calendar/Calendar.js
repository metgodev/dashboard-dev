import React from 'react'
import { Box } from '@mui/system'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import BigCalendar from '../../components/BigCalendar/BigCalendar'

const Calendar = () => {
    return (
        <Box sx={{ width: '50%' }}>
            <PageTitle title={term('calendar')} />
            <BigCalendar />
        </Box>
    )
}

export default Calendar