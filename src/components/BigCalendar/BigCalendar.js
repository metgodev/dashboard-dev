import { Box } from '@mui/material'
import React from 'react'
import { Calendar } from 'react-native-big-calendar'
import getWindowSize from '../../hooks/useGetWindowSize'
import 'dayjs/locale/he'

function BigCalendar({ events }) {

    const { width, height } = getWindowSize()

    return (
        <Box style={{ width: '100%' }}>
            <Calendar
                events={events}
                height={height - 200}
                mode={'month'}
                locale='he'
            />
        </Box>
    )
}

export default BigCalendar