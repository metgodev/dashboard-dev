import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/styles";
import { isMobileDevice } from '../../../../utils/ismobile';
import { ar, he } from "date-fns/locale";
import { useSelector } from 'react-redux';
//styles
import useStyles from "../../styles";
// Component
import Widget from "../../../../components/Widget/Widget";
import term from '../../../../terms';


export default function Calendar() {
    const [date, changeDate] = useState(new Date());
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

    return (
        <Widget title={term('calendar')} upperTitle className={classes.card} >
            <MuiPickersUtilsProvider locale={calendarLang()} utils={DateFnsUtils}>
                <ThemeProvider theme={theme}>
                    <DatePicker
                        autoOk
                        orientation={!isMobileDevice() && "landscape"}
                        variant="static"
                        openTo="date"
                        value={date}
                        onChange={changeDate}
                    />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </Widget>
    );
}

