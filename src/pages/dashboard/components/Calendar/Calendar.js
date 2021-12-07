import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import { useTheme } from "@material-ui/styles";
import { isMobileDevice } from '../../../../utils/ismobile';

//styles
import useStyles from "../../styles";
// Component
import Widget from "../../../../components/Widget/Widget";


export default function Calendar() {
    const [date, changeDate] = useState(new Date());
    let classes = useStyles();
    let theme = useTheme();

    return (
        <Widget title="Calendar" upperTitle className={classes.card} >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
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

