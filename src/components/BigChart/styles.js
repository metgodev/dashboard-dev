import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    mainChartBody: {
        overflowX: "auto",
    },
    mainChartHeader: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        [theme.breakpoints.only("xs")]: {
            flexWrap: "wrap",
        },
    },
    mainChartHeaderLabels: {
        display: "flex",
        alignItems: "center",
        [theme.breakpoints.only("xs")]: {
            order: 3,
            width: "100%",
            height: '20px',
            justifyContent: "center",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(2),
        },
    },
    mainChartHeaderLabel: {
        display: "flex",
        alignItems: "center",
        marginLeft: theme.spacing(3),
    },
    mainChartSelectRoot: {
        borderColor: theme.palette.text.hint + "80 !important",
    },
    mainChartSelect: {
        padding: 10,
        paddingRight: 25,
    },
    mainChartLegentElement: {
        fontSize: "18px !important",
        marginLeft: theme.spacing(1),
    },
}));
