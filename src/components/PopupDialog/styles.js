import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dialogHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: '10px !important',
    },
    dialogContent: {
        overflowX: 'hidden',
        padding: 0,
        margin: 0,
    },
    textFieldUnderline: {
        "&:before": {
            borderBottomColor: theme.palette.primary.light,
        },
        "&:after": {
            borderBottomColor: theme.palette.primary.main,
        },
        "&:hover:before": {
            borderBottomColor: `${theme.palette.primary.light} !important`,
        },
    },
    textField: {
        borderBottomColor: theme.palette.background.light,
    },
    stickyBox: {
        position: 'sticky',
        top: '0px',
        zIndex: 3,
        backgroundColor: '#fff',
        boxShadow: '0px 0px 5px #ccc',
        borderBottom: .1,
        borderColor: 'lightGray',
        width: '100%'
    },
    uploadMediaTabWrapper: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: "center", 
        width: '100%'
    },
    dragDropWrapper: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'center'
    },
    divider: {
        width:"80%",
        height: "1px",
        backgroundColor: theme.palette.primary.main
    },
    cropBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px' 
    },
    toggleButtons: {
        direction:"ltr",
        marginTop: "20px",
        marginBottom: "20px"
    }
}));
