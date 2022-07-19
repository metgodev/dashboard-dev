import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        width: '100%',
        height: '100%',
    },
    stepWrapper: {
        paddingTop: '10px',
        marginBottom: '100px',
        height: '100%'
    },
    bottomLeft: {
        position: 'absolute',
        left: 10,
        bottom: 10,
    },
    bottomRight: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    }
}));