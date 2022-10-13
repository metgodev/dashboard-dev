import React, { useEffect, useState } from 'react'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Checkbox, Collapse, FormControlLabel, FormGroup } from '@mui/material';
import { placeholderData } from './config'
import useStyles from "./styles";
import SingleDayTime from './SingleDayTime';
import ChangeAllDays from './ChangeAllDays';

const TimePicker = ({ title, realData, setTimes, disabled }) => {

    const [open, setOpen] = useState(false)
    const [data, setData] = useState({})

    const classes = useStyles()

    useEffect(() => {
        if (realData !== undefined && realData !== null && Object.keys(realData).length > 0) {
            const realDataWithOpenOrClosed = { ...realData }
            for (let i = 0; i < Object.keys(realDataWithOpenOrClosed).length; i++) {
                if (realDataWithOpenOrClosed[Object.keys(realDataWithOpenOrClosed)[i]].open === undefined) {
                    realDataWithOpenOrClosed[Object.keys(realDataWithOpenOrClosed)[i]].open = true
                }
            }
            setData(realData)
        } else {
            setData(placeholderData)
        }
    }, [realData])

    return (
        <div>
            <Button disabled={disabled} variant="outlined" sx={{ color: 'rgba(0,0,0,0.6)', borderColor: 'rgba(0,0,0,0.3)', height: '50px' }} onClick={() => {
                if (!disabled) {
                    setOpen(prev => !prev)
                }
            }} style={{ width: '100%' }}>
                {title}
                {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} orientation="vertical">
                <div className={classes.container}>
                    <ChangeAllDays setData={setTimes} />
                    {Object.keys(data).length > 0 && Object.keys(data).map(key => (
                        <SingleDayTime key={key} day={key} hours={data[key]} setDayData={(newDayData) => {
                            setTimes({ ...data, [key]: newDayData })
                        }} />
                    ))}
                </div>
            </Collapse >
        </div >
    )
}

export default TimePicker