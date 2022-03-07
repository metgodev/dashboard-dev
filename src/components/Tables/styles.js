import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    tableContainer: {
        height: "72vh",
        overflowY: "auto",
        overflowX: "hidden",
        padding: "0px",
        margin: "0px",
        border: "none",
        borderRadius: "0px",
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:focus": {
            outline: "none"
        }
    },
    statusBtns: {
        margin: "0px",
        padding: "0px",
        border: "none",
        borderRadius: "0px",
        boxShadow: "none",
        backgroundColor: "transparent",
        "&:focus": {
            outline: "none"
        }

    },
    rowCell: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0px',
        margin: '0px',
        border: 'none',
        borderRadius: '0px',
        boxShadow: 'none',
        backgroundColor: 'transparent',
        "&:focus": {
            outline: "none"
        }
    },
}));
