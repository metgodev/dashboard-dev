import { Box } from '@mui/material'
import React from 'react'
import { Calendar } from 'react-native-big-calendar'
import getWindowSize from '../../hooks/useGetWindowSize'
import 'dayjs/locale/he'
import { MOBILE_WIDTH } from '../../data/constants'
function BigCalendar({ events }) {

    const { width, height } = getWindowSize()

    const handleCellStyle = (e) => {
        return (
            { backgroundColor: e.color, color: 'black' }
        )
    }

    const renderEvent = (event) => (
        <p style={{ width: '100%', padding: 0, margin: 0, }}>
            <p style={{ margin: 0, backgroundColor: event.color, fontSize: '10px', fontWeight: 'bold', padding: width > MOBILE_WIDTH ? 3 : 0, borderRadius: '5px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', width: '100%' }}>{`${event.title}`}</p>
        </p>
    )

    return (
        <Box style={{ width: '100%' }}>
            <Calendar
                events={events}
                height={height - 200}
                mode={'month'}
                locale='he'
                eventCellStyle={(e) => handleCellStyle(e)}
                renderEvent={renderEvent}
            />
        </Box>
    )
}

export default BigCalendar