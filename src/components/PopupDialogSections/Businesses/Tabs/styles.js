import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        padding: '10px',
        height: '50%',
    },
    submitButtonRight: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    submitButtonLeft: {
        position: 'absolute',
        bottom: 10,
        left: 20
    },
}));