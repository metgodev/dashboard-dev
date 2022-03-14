import React, { useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/styles";
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
import { Checkbox } from '@material-ui/core';
import { Box } from '@mui/system';
//styles
import useStyles from "./styles";
// Component
import Widget from "../Widget/Widget";
import term from '../../terms';


export default function TimeSelector({ warp, label, type, times, timeref, setTimes, removeDay, setChecked, checked }) {
    let openingTime = times?.start ? parseInt(times.start) : 8
    let closingTime = times?.end ? parseInt(times.end) : 16

    const [selectedDate, handleDateChange] = useState(new Date().setHours(type === 1 ? openingTime : closingTime, 0, 0));
    const { lang } = useSelector(state => state.mainRememberReducer)
    let classes = useStyles();
    let theme = useTheme();

    const calendarLang = () => {
        switch (lang) {
            case 'ar':
                return ar;
            case 'he':
                return he;
            default:
                break;
        }
    }
    const Warp = warp ? Widget : Box

    useEffect(() => {
        let hours = new Date(selectedDate).toLocaleTimeString([], {
            hourCycle: 'h23',
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })
        if (!setTimes) return
        setTimes(hours, timeref, type)
    }, [selectedDate])

    useEffect(() => {
        if (!setTimes) return
        handleDateChange(new Date().setHours(type === 1 ? openingTime : closingTime, 0, 0))
    }, [checked])

    const handleCheck = (e, timeref) => {
        if (!e.target.checked) {
            setChecked([...checked, timeref]);
        } else {
            setChecked(checked.filter(time => time !== timeref));
        }
    }

    return (
        <Warp title={term('time')} uppertitle className={classes.card} >
            <ThemeProvider theme={theme}>
                <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>

                        <TimePicker
                            style={{ width: '100%' }}
                            ampm={false}
                            inputVariant="outlined"
                            autoOk={true}
                            todayLabel={term('today')}
                            label={label || term("sunday_opening")}
                            value={selectedDate}
                            minutesStep={5}
                            okLabel={term('confirm')}
                            cancelLabel={term('cancel')}
                            onChange={handleDateChange}
                            disabled={checked?.includes(timeref) || false}
                        />
                        {type === 2 && <Checkbox
                            onClick={(e) => removeDay(timeref, e)}
                            onChange={(e) => handleCheck(e, timeref)}
                            defaultChecked={true}
                        />}
                    </div>
                </MuiPickersUtilsProvider>
            </ThemeProvider>
        </Warp>
    );
}

