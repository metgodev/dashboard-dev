import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    box: {
        padding: theme.spacing(1)
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginBottom: theme.spacing(1),
    },
    logotype: {
        width: '100%',
        height: '8rem',
    },
}));