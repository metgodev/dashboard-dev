import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dragAndDrop: {
        cursor: "pointer",
        borderRadius: "10px",
        border: "2px dashed #c1c1c1",
        height: "30vh",
        width: "100%",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    innerText: {
        fontSize: "1.3rem",
        fontWeight: "500",
    },
    maximumUploadText: {
        padding: 0,
        marginTop: 30,
        marginBottom: 0
    }
}));
