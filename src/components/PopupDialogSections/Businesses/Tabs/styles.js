import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    container: {
        padding: '10px',
        height: '50%',
    },
    submitButtonRight: {
        position: 'absolute',
        right: 10,
        bottom: 10,
    },
    submitButtonLeft: {
        position: 'absolute',
        bottom: 10,
        left: 20
    },
    addProductsHeader: {
        fontWeight: 'bold',
    },
    premiumTabContainer: {
        padding: '10px',
    },
    termsContainer: {
        padding: '10px',
        margin: '20px',
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '10px'
    },
    buttonContainer: {
        width: '100%',
        textAlign: 'left',
        paddingLeft: '15px',
        paddingBottom: '7px',
        position: 'absolute',
        left: 0,
        bottom: 0
    },
    contactPersonValuesContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'right',
        margin: '20px',
        gap: '5px'
    },
    waitingForPremiumContainer: {
        width: '100%',
        height: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    premiumInnerContainer: {
        gap: 5,
        border: '1px solid rgba(0,0,0,0.2)',
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        padding: '50px'
    },
    adminPremiumContainer: {
        width: '100%',
        padding: '20px'
    },
}));