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
// import { useDispatch } from 'react-redux'
// import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
// import MODAL_STATES from '../../data/modal_states'

const Calendar = () => {

    //const dispatch = useDispatch()

    const [events, setEvents] = useState([])
    // const [open, setOpen] = useState(false)
    // const [dialogType, setDialogType] = useState(null)

    const getEvents = useGetService(BACK_ROUTES.EVENTS, CACHED_DATA_ROUTES.EVENTS, { $limit: 1000 })

    // const openDialog = (data) => {
    //     if (Object.keys(data).length > 0) {
    //         dispatch(set_edit_tab_data(data))
    //         setDialogType(MODAL_STATES.EDIT)
    //     }
    //     else {
    //         dispatch(set_edit_tab_data({}))
    //         setDialogType(MODAL_STATES.ADD)
    //     }
    //     setOpen(!open)
    // }

    useEffect(() => {
        if (!getEvents.loading) {
            setEvents(getEvents.data.map(event => {
                const startDate = new Date(event.startDate)
                const endDate = new Date(event.endDate)
                return (
                    {
                        ...event,
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
            {events.loading ?
                <CircularProgress size={50} />
                :
                <BigCalendar events={events} />
            }
        </Box>
    )
}

export default Calendar