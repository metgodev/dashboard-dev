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
import LANGUAGES from '../../data/languages';


export default function Calendar({ type, warp, setDate, setDateTwo, field, disableHelpers }) {

    const [date, changeDate] = useState(new Date());
    const [datetwo, changeDateTwo] = useState(new Date());
    const { lang } = useSelector(state => state.mainRememberReducer)
    let classes = useStyles();
    let theme = useTheme();

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
                        healperText={!disableHelpers && (validDate ? term('date_error') : term('date_format'))}
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
                    helperText={!disableHelpers && (validDate ? term('date_error') : term('date_format'))}
                />}
            </MuiPickersUtilsProvider>
        </Warp>
    );
}

