import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        maxHeight: '250px',
        width: '100%',
    },
    eventContainer: {
        borderRadius: "5px",
        padding: '5px',
        margin: '0px 5px',
        color: 'rgba(0,0,0,0.8)',
        marginTop: '7px',
        backgroundColor: 'rgba(0,0,0,0.03)'
    },
    eventsContainer: {
        overflowY: 'scroll',
        backgroundColor: 'white',
        flex: 1,
        textAlign: 'center',
        padding: '3px',
        borderRadius: '5px',
        height: '40vh',
        direction: 'ltr'
    },
    header: {
        color: 'rgba(0,0,0,0.8)',
        fontSize: '20px',
    }
}));