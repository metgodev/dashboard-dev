import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    day: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        padding: '10px',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '5px',
        marginTop: '10px',
        marginBottom: '10px'
    },
    dayLeftSide: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    dayRightSide: {
        display: 'flex',
        gap: 5
    },
    toggleButton: {
        borderColor: 'rgba(0,0,0,0.2)',
        color: 'red'
    }
}));