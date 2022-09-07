import React, { useCallback, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
//styles
import useStyles from "./styles";
// Component
import Widget from "../Widget/Widget";
import term from '../../terms';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import LANGUAGES from '../../data/languages';
import { TextField } from '@material-ui/core';
import EventsBox from '../EventsBox/EventsBox';

export default function Calendar({ type, warp, setDate, setDateTwo, field, disableHelpers, events }) {

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

    useEffect(() => {
        let d2 = new Date(datetwo).toLocaleDateString()
        if (setDate) setDate(date)
        if (setDateTwo) setDateTwo(d2, field)
    }, [date, datetwo])

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

    return (
        <Warp title={term('calendar')} uppertitle className={classes.card} >
            {type === 1 &&
                <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                    {events &&
                        <EventsBox
                            events={getEvents()}
                        />
                    }
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Box style={{ direction: 'ltr', flex: 1 }}>
                            <StaticDatePicker
                                displayStaticWrapperAs="desktop"
                                value={date}
                                onChange={(newValue) => {
                                    changeDate(newValue);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Box>
                    </LocalizationProvider>
                </Box>
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

