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
    logotypeClickable: {
        width: '100%',
        height: '6rem',
        cursor: 'pointer'
    },
    logotype: {
        width: '100%',
        height: '8vh',
    },
    h: {
        padding: 1, margin: 1,
    },
    circleBox: {
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
    },
    circle: {
        borderRadius: '5rem',
        borderColor: 'rgba(10, 10, 10,.5)',
        borderWidth: 1,
        backgroundColor: 'rgba(10, 10, 10,.1)',
        padding: 3,
        paddingLeft: 5,
        paddingRight: 5
    }
}));