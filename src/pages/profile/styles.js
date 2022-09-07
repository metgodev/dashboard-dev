import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100vh'
    },
    pageTitleContainer: {
        position: 'absolute',
        top: 15,
        right: 105
    },
    cropBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%'
    },
    contentContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'start',
        flexDirection: 'column',
        height: '60vh',
        width: '100%'
    },
    profileImage: {
        width: '250px',
        height: '250px',
        borderRadius: '50%',
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.7
        },
        marginBottom: '20px'
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        textAlign: 'center'
    }
}));