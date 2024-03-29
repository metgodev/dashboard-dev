import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    card: {
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
    },
    visitsNumberContainer: {
        display: "flex",
        alignItems: "center",
        flexGrow: 1,
        paddingBottom: theme.spacing(1),
    },
    progressSection: {
        marginBottom: theme.spacing(1),
    },
    progressTitle: {
        marginBottom: theme.spacing(2),
    },
    progress: {
        marginBottom: theme.spacing(1),
        backgroundColor: theme.palette.primary.main,
    },
    pieChartLegendWrapper: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-end",
        marginRight: theme.spacing(1),
    },
    legendItemContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: theme.spacing(1),
    },
    fullHeightBody: {
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    progressBar: {
        backgroundColor: theme.palette.warning.main,
    },
    performanceLegendWrapper: {
        display: "flex",
        flexGrow: 1,
        alignItems: "center",
        marginBottom: theme.spacing(1),
    },
    legendElement: {
        display: "flex",
        alignItems: "center",
        marginRight: theme.spacing(2),
    },
    legendElementText: {
        marginLeft: theme.spacing(1),
    },
    serverOverviewElement: {
        display: "flex",
        alignItems: "center",
        maxWidth: "100%",
    },
    serverOverviewElementText: {
        minWidth: 145,
        paddingRight: theme.spacing(2),
    },
    serverOverviewElementChartWrapper: {
        width: "100%",
    },
}));
