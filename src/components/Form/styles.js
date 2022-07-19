import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    form: {
        width: '100%',
        padding: '10px',
        marginBottom: '20px',
        height: '100%'
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
        bottom: 10,
    },
    submitButtonLeft: {
        position: 'absolute',
        bottom: 10,
        left: 20
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
        position: 'fixed',
        bottom: 0
    }
}));
