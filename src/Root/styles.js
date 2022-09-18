import { makeStyles } from "@material-ui/styles";
// window dimensions
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

export default makeStyles(theme => ({
  root: {
    width: windowWidth,
    height: windowHeight,
    overflowX: "hidden",
  },
  Router: {
    top: theme.spacing(6),
    width: "100%",
    height: "100%",
    padding: '5px'
  },
}));
