import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    form: {
        width: '100%',
        padding: '10px',
        position: 'relative'
    },
    gridContainer: {
        width: '100%'
    },
    item: {
        overflow: 'hidden'
    },
    submitButtonRight: {
        position: 'absolute',
        right: 10,
        bottom: -55
    },
    submitButtonLeft: {
        position: 'absolute',
        left: 10,
        bottom: -55
    },
    resizeTextField: {
        width: '100%',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '5px',
        maxWidth: '100%',
        fontFamily: 'Arial',
        fontWeight: '500',
        fontSize: '14px',
        padding: '10px'
    },
    submitButton: {
        position: 'absolute',
        bottom: 0
    }
}));
