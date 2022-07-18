import React, { useEffect, useState } from 'react'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Collapse } from '@mui/material';
import { placeholderData } from './config'
import useStyles from "./styles";
import SingleDayTime from './SingleDayTime';

const TimePicker = ({ title, realData, setTimes }) => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})

    const classes = useStyles()

    useEffect(() => {
        if (Object.keys(realData).length > 0) {
            setData(realData)
        } else {
            setData(placeholderData)
        }
    }, [realData])

    return (
        <div>
            <Button variant="outlined" sx={{ color: 'rgba(0,0,0,0.6)', borderColor: 'rgba(0,0,0,0.3)', height: '50px' }} onClick={() => setOpen(prev => !prev)} style={{ width: '100%' }}>
                {title}
                {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} orientation="vertical">
                <div className={classes.container}>
                    {Object.keys(data).length > 0 && Object.keys(data).map(key => (
                        <SingleDayTime day={key} hours={data[key]} setDayData={(newDayData) => {
                            setTimes({ ...realData, [key]: newDayData })
                        }} />
                    ))}
                </div>
            </Collapse >
        </div >
    )
}

export default TimePicker