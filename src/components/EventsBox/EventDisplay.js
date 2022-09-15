import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import term from '../../terms'
import { GetTagColor } from '../Form/FormFunctions'
function EventDisplay({ event }) {

    const [name, setName] = useState('')
    const [openHour, setOpenHour] = useState('')
    const [address, setAddress] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        setName(event.name)
        setOpenHour(event.openHour)
        setAddress(event.locationName)
        setPrice(event.price > 0 ? event.price : term('free'))
        setDescription(event.shortDescription)
    }, [event])

    const classes = useStyles()

    return (
        <Box className={classes.eventContainer} style={{ backgroundColor: GetTagColor(event?.tags[0]?.category?.title) }}>
            <div><span style={{ fontWeight: 'bold' }}>{`${term('name')}: `}</span>{`${name}`}<span></span></div>
            <div><span style={{ fontWeight: 'bold' }}>{`${term('description')}: `}</span>{`${description}`}<span></span></div>
            <div><span style={{ fontWeight: 'bold' }}>{`${term('open_hour')}: `}</span>{`${openHour}`}<span></span></div>
            <div><span style={{ fontWeight: 'bold' }}>{`${term('address')}: `}</span>{`${address}`}<span></span></div>
            <div><span style={{ fontWeight: 'bold' }}>{`${term('price')}: `}</span>{`${price}`}<span></span></div>
        </Box>
    )
}

export default EventDisplay