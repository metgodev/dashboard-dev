import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    header: {
        marginTop: theme.spacing(8),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerMenuButton: {
        flexDirection: "column",
    },
    headerIcon: {
        color: theme.palette.primary.main,
    },
    headerIconText: {
        margin: 0,
        padding: 0,
        color: theme.palette.primary.main,
    },
}));
