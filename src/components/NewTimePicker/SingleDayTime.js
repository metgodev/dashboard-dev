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
                <Checkbox checked={true} />
                <Typography>{term(day)}</Typography>
            </div>
            <div className={classes.dayRightSide}>
                <TextField
                    id="openTime"
                    label={term('opening_time')}
                    type="time"
                    value={hours.start}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setDayData({ start: e.target.value, end: hours.end })
                    }}
                />
                <TextField
                    id="closeTime"
                    label={term('closing_time')}
                    type="time"
                    value={hours.end}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={(e) => {
                        setDayData({ end: e.target.value, start: hours.start })
                    }}
                />
            </div>
        </div>
    )
}

export default SingleDayTime