import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        width: '100%',
        height: '100vh',
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
        width: '100%',
        gap: 50
    },
    profileImage: {
        cursor: 'pointer',
        '&:hover': {
            opacity: 0.7
        },
        marginBottom: '20px'
    },
    details: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        marginTop: '20px'
    },
    text: {
        textAlign: 'center'
    }
}));