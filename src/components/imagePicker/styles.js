import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    toggleButton: {
        color: 'rgba(0,0,0,0.6)',
        borderColor: 'rgba(0,0,0,0.3)',
        height: '50px'
    },
    imageListContainer: {
        padding: '10px',
        marginLeft: '10px',
        marginRight: '10px',
    },
    image: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0.2rem rgba(0,0,0,0.5)',
        margin: '10px',
    },
    chosenImage: {
        padding: '5px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 0.2rem rgba(0,0,0,1)',
        margin: '10px',
        opacity: 0.6
    }
}));