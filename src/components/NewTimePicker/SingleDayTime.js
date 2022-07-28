import { Checkbox, TextField } from '@mui/material';
import React from 'react'
import term from '../../terms';
import { Typography } from '../Wrappers/Wrappers';
import useStyles from './styles'

function SingleDayTime({ day, hours, setDayData }) {

    const classes = useStyles()

    return (
        <div className={classes.day}>
            <div className={classes.dayLeftSide}>
                <Checkbox
                    checked={hours.open}
                    onChange={(e) => {
                        setDayData({ start: hours.start, end: hours.end, open: e.target.checked })
                    }}
                />
                <Typography>{term(day)}</Typography>
            </div>
            <div className={classes.dayRightSide}>
                <TextField
                    disabled={hours.open ? false : true}
                    id="openTime"
                    label={term('opening_time')}
                    type="time"
                    value={hours.start}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setDayData({ start: e.target.value, end: hours.end, open: hours?.open ? hours.open : true })
                    }}
                />
                <TextField
                    disabled={hours.open ? false : true}
                    id="closeTime"
                    label={term('closing_time')}
                    type="time"
                    value={hours.end}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setDayData(prev => ({ ...prev, end: e.target.value, open: hours?.open ? hours.open : true }))
                    }}
                />
            </div>
        </div>
    )
}

export default SingleDayTime