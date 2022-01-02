import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    box: {
        padding: theme.spacing(1),
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
    },
    logotype: {
        width: '100%',
        height: '6rem',
    },
    h: {
        padding: 1, margin: 1,
    },
    circleBox: {
        width: '100%',
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    circle: {
        borderRadius: '5rem',
        borderColor: 'rgba(10, 10, 10,.5)',
        borderWidth: 1,
        backgroundColor: 'rgba(10, 10, 10,.1)',
        padding: 2,
        marginInline: 20
    }
}));