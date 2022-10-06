import React from 'react'
import { Box } from '@mui/system';
import term from '../../terms';
import EventDisplay from './EventDisplay';
import useStyles from './styles'

function EventsBox({ events }) {

    const classes = useStyles()

    return (
        <Box className={classes.container}>
            <Box className={classes.eventsContainer}>
                <Box>
                    {events.length > 0 ?
                        events?.map(event => {
                            return (
                                <EventDisplay event={event} />
                            )
                        })
                        :
                        <>
                            {term('no_events_on_this_date')}
                        </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default React.memo(EventsBox)