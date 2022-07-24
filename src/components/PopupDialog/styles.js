import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dialogContent: {
        overflowX: 'hidden',
        padding: 0,
        margin: 0,
        position: 'relative',
        height: '100%'
    }
}));
