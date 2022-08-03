import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    draggableContainer: {
        border: '1px solid rgba(0,0,0,0.3)',
        marginTop: '10px',
        marginBottom: '10px',
        padding: '5px',
        borderRadius: '5px'
    },
    draggingListItem: {
        background: 'rgba(0,0,0,0.3)',
    },
    regularListItem: {
        background: 'rgba(0,0,0,0.05)',
        marginBottom: '5px',
        height: '40px',
        textAlign: 'right'
    }
}));
