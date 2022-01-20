import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { TimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/styles";
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
//styles
import useStyles from "./styles";
// Component
import Widget from "../Widget/Widget";
import term from '../../terms';
import { Box } from '@mui/system';
import { useEffect } from 'react';


export default function TimeSelector({ warp, label, type, times, timeref, setTimes }) {
    let openingTime = times?.start ? parseInt(times.start) : 8
    let closingTime = times?.end ? parseInt(times.end) : (16, 30)

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
        if (!setTimes) return
        let hours = new Date(selectedDate).toLocaleTimeString([], {
            hourCycle: 'h23',
            hour: '2-digit',
            minute: '2-digit'
        })
        setTimes(hours, timeref, type)
    }, [])

    return (
        <Warp title={term('time')} uppertitle className={classes.card} >
            <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                <ThemeProvider theme={theme}>
                    <TimePicker
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
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </Warp>
    );
}

