import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    boxWrapper: {
        display: 'flex',
        alignItems: 'end',
    },
    box: {
        paddingBottom: theme.spacing(.2)
    },
    button: {
        marginInline: theme.spacing(.5),
        color: theme.palette.primary.main,
        boxShadow: theme.customShadows.widget,
        textTransform: "none",
        "&:active": {
            boxShadow: theme.customShadows.widgetWide,
        },
    },
    buttonClicked: {
        backgroundColor: theme.palette.warning.main,
    },
}));
