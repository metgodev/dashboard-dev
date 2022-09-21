import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import BigCalendar from '../../components/BigCalendar/BigCalendar'
import ENTITY_STATUS from '../../data/entity_status'
import useGetService from '../../hooks/useGetService'
import BACK_ROUTES from '../../data/back_routes'
import CACHED_DATA_ROUTES from '../../data/cached_data_routes'

const Calendar = () => {

    const [events, setEvents] = useState([])

    const getEvents = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.EVENTS, { status: ENTITY_STATUS.PUBLIC, $limit: 1000, $select: ['startDate', 'name', 'openHour', 'endDate', 'tagsIds'] })

    useEffect(() => {
        if (!getEvents.loading) {
            setEvents(getEvents.data.map(event => {
                const startDate = new Date(event.startDate)
                const endDate = new Date(event.endDate)
                return (
                    {
                        title: event.name,
                        start: startDate,
                        end: endDate
                    }
                )
            }))
        }
    }, [getEvents])
    // {
    //     title: 'Meeting',
    //     start: new Date(2020, 1, 11, 10, 0),
    //     end: new Date(2020, 1, 11, 10, 30),
    //   },

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <PageTitle title={term('event_calendar')} />
            <BigCalendar events={events} />
        </Box>
    )
}

export default Calendar