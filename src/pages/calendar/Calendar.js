import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import BigCalendar from '../../components/BigCalendar/BigCalendar'
import useGetService from '../../hooks/useGetService'
import BACK_ROUTES from '../../data/back_routes'
import CACHED_DATA_ROUTES from '../../data/cached_data_routes'
import { CircularProgress } from '@mui/material'
import { GetTagColor } from '../../components/Form/FormFunctions'

const Calendar = () => {

    const [events, setEvents] = useState([])

    const getEvents = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.EVENTS_TABLE, { $limit: 1000, $select: ['startDate', 'name', 'openHour', 'endDate', 'tagsIds'] })

    useEffect(() => {
        if (!getEvents.loading) {
            setEvents(getEvents.data.map(event => {
                const startDate = new Date(event.startDate)
                const endDate = new Date(event.endDate)
                return (
                    {
                        title: event.name,
                        start: startDate,
                        end: endDate,
                        color: GetTagColor(event.tags[0].category.title)
                    }
                )
            }))
        }
    }, [getEvents])

    return (
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <PageTitle title={term('event_calendar')} />
            {events.loading ? <CircularProgress size={50} /> : <BigCalendar events={events} />}
        </Box>
    )
}

export default Calendar