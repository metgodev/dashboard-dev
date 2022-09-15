import React, { useState } from 'react'
import { Button, TextField } from '@mui/material'
import term from '../../terms'
import useStyles from './styles'

function ChangeAllDays({ setData }) {

    const [hours, setHours] = useState({ start: "08:00", end: '16:00' })

    const classes = useStyles()

    const handleClick = () => {
        setData({ sunday: { ...hours, open: true }, monday: { ...hours, open: true }, tuesday: { ...hours, open: true }, wednesday: { ...hours, open: true }, thursday: { ...hours, open: true }, friday: { ...hours, open: false }, saturday: { ...hours, open: false } })
    }

    return (
        <div className={classes.day}>,
            <div className={classes.dayLeftSide}>
                <Button onClick={() => handleClick()} variant={'contained'}>{term('true_for_all_week_days_excluding_weekend')}</Button>
            </div>
            <div className={classes.dayRightSide}>
                <TextField
                    disabled={false}
                    id="openTime"
                    label={term('opening_time')}
                    type="time"
                    value={hours.start}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setHours({ start: e.target.value, end: hours.end })
                    }}
                />
                <TextField
                    disabled={false}
                    id="closeTime"
                    label={term('closing_time')}
                    type="time"
                    value={hours.end}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setHours({ start: hours.start, end: e.target.value })
                    }}
                />
            </div>
        </div>
    )
}

export default ChangeAllDays