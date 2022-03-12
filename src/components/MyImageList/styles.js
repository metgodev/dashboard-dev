import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
    imageList: {
      width: '100%',
      height: '100%'
    },
    image:{
      width:"200px",
      height:"200px",
      position: "relative",
    },
    audio: {
      width:"270px",
      height:"100px",
      position: "relative",
    },
    deleteWrapper: {
        borderRadius: "15px",
        position:"absolute",
        left: "0px",
        top: "5px",
        left: "5px",
        backgroundColor: theme.palette.background.default,
        cursor:"pointer",
        boxShadow: "1px 1px 5px black"
    }
}));