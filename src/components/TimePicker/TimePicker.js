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


export default function TimeSelector({ warp, label , type}) {
    const [selectedDate, handleDateChange] = useState(new Date().setHours(type === 1 ? 8 : 16,30,0,0));
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

    return (
        <Warp title={term('time')} uppertitle className={classes.card} >
            <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                <ThemeProvider theme={theme}>
                    <TimePicker
                        ampm={false}
                        inputVariant="outlined"
                        autoOk={true}
                        todayLabel={'היום'}
                        label={label || 'פתיחה יום ראשון'}
                        value={selectedDate}
                        minutesStep={5}
                        okLabel={'אישור'}
                        cancelLabel={'ביטול'}
                        onChange={handleDateChange}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </Warp>
    );
}

