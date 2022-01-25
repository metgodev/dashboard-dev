import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableContainer: {
        maxHeight: '75vh',
    },
    statusBtns: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    rowCell: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
