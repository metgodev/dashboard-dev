import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/styles";
import { isMobileDevice } from '../../utils/ismobile';
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
//styles
import useStyles from "./styles";
// Component
import Widget from "../Widget/Widget";
import term from '../../terms';
import { Box } from '@mui/system';
import { useEffect } from 'react';


export default function Calendar({ type, warp, setDate, setDateTwo, field }) {
    const [date, changeDate] = useState(new Date());
    const [datetwo, changeDateTwo] = useState(new Date());
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

    useEffect(() => {
        let d2 = new Date(datetwo).toLocaleDateString()
        if (setDate) setDate(date)
        if (setDateTwo) setDateTwo(d2, field)
    }, [date, datetwo])

    let validDate = date < new Date() && datetwo < date
    const Warp = warp ? Widget : Box

    return (
        <Warp title={term('calendar')} uppertitle className={classes.card} >
            <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                {type === 1 && <ThemeProvider theme={theme}>
                    <DatePicker
                        autoOk
                        orientation={!isMobileDevice() && "landscape"}
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={changeDate}
                        error={validDate}
                        healperText={validDate ? term('date_error') : ''}
                    />
                </ThemeProvider>
                }
                {type === 2 && <KeyboardDatePicker
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label=""
                    format="MM/dd/yyyy"
                    value={datetwo}
                    InputAdornmentProps={{ position: "end" }}
                    onChange={date => changeDateTwo(date)}
                    error={validDate}
                    helperText={validDate ? term('date_error') : term('date_format')}
                />}
            </MuiPickersUtilsProvider>
        </Warp>
    );
}

