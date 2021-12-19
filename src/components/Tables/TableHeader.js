import React from 'react'
import Widget from '../Widget/Widget'
// styles
import useStyles from "./styles";

function TableHeader() {
    let classes = useStyles();

    return (
        <Widget disableWidgetMenu bodyClass={classes.tableHeader}>

        </Widget>
    )
}

export default TableHeader
