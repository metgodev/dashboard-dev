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
        background: 'rgb(235,235,235)',
    },
    regularListItem: {
        border: '1px solid rgba(0,0,0,0.3)',
        borderRadius: '5px',
        marginBottom: '5px',
        height: '40px'
    }
}));
