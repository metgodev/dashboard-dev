import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    contentContainer: {
        display: 'flex',
        width: '100%',
        height: '50vh',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
    },
    email: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    phone: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    h1: {
        marginBottom: 0
    },
    h2: {
        marginTop: 0
    },
    text: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'black'
    },
    mailIconContainer: {
        width: '30px',
        height: '30px',
        backgroundColor: '#84E706',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneIconContainer: {
        width: '30px',
        height: '30px',
        backgroundColor: '#0680E7',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));