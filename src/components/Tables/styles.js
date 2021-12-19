import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    paper: {
        width: '100%',
        overflow: 'hidden',
        direction: theme.direction
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
