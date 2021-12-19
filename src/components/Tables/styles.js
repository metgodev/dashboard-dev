import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableHeader: {
        marginBottom: theme.spacing(2)
    },
    tableContainer: {
        maxHeight: '76vh'
    },
    statusBtns: {
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    }
}));
