import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: '10px !important',
    },
    dialogContent: {
        // overflow: 'hidden',
        padding: 0,
        margin: 0,
    }
}));
