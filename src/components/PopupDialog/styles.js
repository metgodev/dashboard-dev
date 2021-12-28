import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dialogContent: {
        // overflow: 'hidden',
        padding: 0,
        margin: 0,
    }
}));
