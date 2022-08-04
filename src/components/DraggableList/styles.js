import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    draggableContainer: {
        borderRadius: '5px',
        padding: '30px'
    },
    draggingListItem: {
        background: 'rgba(0,0,0,0.3)',
    },
    regularListItem: {
        background: 'rgba(0,0,0,0.05)',
        height: '30px',
        textAlign: 'right',
        marginBottom: '10px'
    }
}));
