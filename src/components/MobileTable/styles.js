import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        oveflowX: 'auto',
        gap: 10,
        padding: '10px'
    },
    entity: {
        width: '90%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '30vh',
        flexDirection: 'column',
        padding: '10px'
    },
    entityImageContainer: {
        width: '100px',
        backgroundColor: 'rgba(0,0,0,0.2)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    entityImage: {
        width: '90%',
        height: '90%'
    },
    heading: {
        fontWeight: 'bold',
        textAlign: 'center'
    }
}));