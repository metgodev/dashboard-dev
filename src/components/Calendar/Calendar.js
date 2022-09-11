import React, { useCallback, useState, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
//styles
import useStyles from "./styles";
// Component
import Widget from "../Widget/Widget";
import term from '../../terms';
import { Box } from '@mui/system';
import LANGUAGES from '../../data/languages';
import EventsBox from '../EventsBox/EventsBox';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CircularProgress } from '@mui/material';

export default function Calendar({ type, warp, disableHelpers, events }) {

    let classes = useStyles();

    const { lang } = useSelector(state => state.mainRememberReducer)

    const [date, changeDate] = useState(new Date());
    const [datetwo, changeDateTwo] = useState(new Date());

    const calendarLang = () => {
        switch (lang) {
            case LANGUAGES.ARABIC:
                return ar;
            case LANGUAGES.HEBREW:
                return he;
            default:
                break;
        }
    }

    let validDate = date < new Date() && datetwo < date
    const Warp = warp ? Widget : Box

    const getEvents = useCallback(() => {
        let eventsToSend = []
        if (events.loading === false) {
            events.data.map(event => {
                const eventsStartDate = new Date(event.startDate)
                const today = new Date(date)
                if (eventsStartDate.getMonth() === today.getMonth() && eventsStartDate.getDate() === today.getDate() && eventsStartDate.getFullYear() === today.getFullYear()) {
                    eventsToSend.push(event)
                }
            })
        }
        return eventsToSend
    }, [events, date])

    const handleDateClicked = (newDate) => {
        changeDate(newDate)
    }

    const doesDayHaveEvents = (events, day) => {
        let flag = false
        events.data.forEach(event => {
            const eventsStartDate = new Date(event.startDate)
            if (eventsStartDate.getDate() === day.getDate() && eventsStartDate.getMonth() === day.getMonth() && eventsStartDate.getYear() === day.getYear()) {
                flag = true
                return
            }
        })
        return flag
    }

    const isTodaySelected = (date, day) => {
        return (date.getDate() === day.getDate() && date.getMonth() === day.getMonth() && date.getYear() === day.getYear())
    }

    const handleRenderDay = useCallback((day, selectedDays, pickersDayProps) => {
        const today = new Date()
        if (isTodaySelected(day, today)) {
            if (isTodaySelected(day, date)) {
                return <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7DD0FD', backgroundColor: 'rgba(0,0,0,0.1)' }}>{day.getDate()}</span>
            } else {
                return <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7DD0FD' }}>{day.getDate()}</span>
            }
        }
        const dayHasEvents = doesDayHaveEvents(events, day)
        if (dayHasEvents) {
            if (isTodaySelected(date, day)) {
                return (
                    <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid blue', backgroundColor: '#7DD0FD' }}>{day.getDate()}</span>
                )
            } else {
                return (
                    <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid blue' }}>{day.getDate()}</span>
                )
            }

        }
        else if (isTodaySelected(date, day)) {
            return (
                <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #7DD0FD', backgroundColor: 'rgba(0,0,0,0.1)' }}>{day.getDate()}</span>
            )
        } else {
            return (
                <span onClick={() => handleDateClicked(day)} style={{ margin: '2px', cursor: 'pointer', width: '11%', height: '3.5vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{day.getDate()}</span>
            )
        }
    }, [date, events])

    return (
        <Warp title={term('calendar')} uppertitle className={classes.card} >
            {type === 1 &&
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    {events?.loading === false ?
                        <>
                            <EventsBox
                                events={getEvents()}
                            />
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={calendarLang()}>
                                <Box style={{ direction: 'ltr', flex: 1 }}>
                                    <StaticDatePicker
                                        displayStaticWrapperAs="desktop"
                                        renderDay={handleRenderDay}
                                    />
                                </Box>
                            </LocalizationProvider>
                        </> :
                        <Box style={{ width: '100%', height: '30vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <CircularProgress size={50} />
                        </Box>
                    }
                </Box >
            }
            {
                type === 2 &&
                <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label=""
                        format="MM/dd/yyyy"
                        value={datetwo}
                        InputAdornmentProps={{ position: "end" }}
                        onChange={date => changeDateTwo(date)}
                        error={validDate}
                        helperText={!disableHelpers && (validDate ? term('date_error') : term('date_format'))}
                    />
                </MuiPickersUtilsProvider>
            }
        </Warp >
    );
}