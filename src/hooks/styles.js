import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    dragAndDrop: {
        cursor: "pointer",
        borderRadius: "10px",
        border: "2px dashed #c1c1c1",
        height: "100p",
        width: "40vw",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    innerText: {
        fontSize: "1.3rem",
        fontWeight: "500",
    }
}));
