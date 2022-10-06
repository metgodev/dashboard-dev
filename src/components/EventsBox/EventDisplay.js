import React, { useEffect, useState } from 'react'
import { Box } from '@material-ui/core'
import useStyles from './styles'
import term from '../../terms'
import placeholder_image from '../../Assets/images/placeholder.jpeg'
import EventNoteIcon from '@mui/icons-material/EventNote';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import attraction from '../../Assets/svgs/attraction.svg'
import culture from '../../Assets/svgs/culture.svg'
import food from '../../Assets/svgs/food.svg'
import local from '../../Assets/svgs/local.svg'
import lodging from '../../Assets/svgs/lodging.svg'
import travel from '../../Assets/svgs/travel.svg'
import GetWindowSize from '../../hooks/useGetWindowSize'

function EventDisplay({ event }) {

    const [name, setName] = useState('')
    const [openHour, setOpenHour] = useState('')
    const [address, setAddress] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [date, setDate] = useState()

    const { width } = GetWindowSize()

    useEffect(() => {
        setName(event.name)
        setOpenHour(event.openHour)
        setAddress(event.authority.name)
        setDescription(event.shortDescription)
        setImage(event.gallery ? event.gallery[0].file.url : placeholder_image)
        setDate(() => {
            const date = new Date(event.startDate)
            return `${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`
        })
    }, [event])

    const getCategory = () => {
        return event.tags[0].category.title.toLowerCase()
    }

    let svgArr = [{ attraction }, { culture }, { food }, { local }, { lodging }, { travel }];
    let img = svgArr.find(s => Object.keys(s)[0] == getCategory() && s)

    const classes = useStyles()

    return (
        <Box
            className={classes.eventContainer}
            style={{ backgroundColor: 'white' }}
        >
            <div style={{ display: 'flex', width: '100%', gap: '5px', flexDirection: width > 1630 ? 'row' : 'column-reverse' }}>
                {width > 1630 && <div id='tag-icon' style={{}}>
                    <div><img style={{ height: '40px' }} src={img[getCategory()]}></img></div>
                </div>}
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '70%', justifyContent: 'center' }}>
                    <div id='details' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', width: '100%', gap: '5px' }}>
                        <span style={{ fontWeight: 'bold', textAlign: 'right', fontSize: '20px' }}>{`${name}`}</span>
                        <span style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '12px' }}>{`${description}`}</span>
                        <div style={{ display: 'flex', justifyContent: 'right', gap: '5px' }}>
                            <span style={{ fontWeight: 'bold', marginTop: '2px', display: 'flex', justifyContent: 'right', gap: '4px', alignItems: 'center' }}><span>{openHour}</span><AccessTimeFilledIcon /></span>
                            <span style={{ fontWeight: 'bold', marginTop: '2px', display: 'flex', justifyContent: 'right', gap: '4px', alignItems: 'center' }}><span>{date}</span><EventNoteIcon /></span>
                        </div>
                        <span style={{ fontWeight: 'bold', marginTop: '2px', display: 'flex', justifyContent: 'right', gap: '4px', alignItems: 'center' }}><span>{address}</span><LocationOnIcon /></span>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><img style={{ height: '100px', width: '200px', borderRadius: '10px' }} src={image}></img></div>
            </div>
            <div style={{ height: '1px', backgroundColor: 'grey', width: '80%', marginTop: '5px' }}></div>
        </Box >
    )
}

export default EventDisplay