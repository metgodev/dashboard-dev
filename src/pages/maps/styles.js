import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    padding: -theme.spacing(1) * 3,
  },
  progressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: '80vh'
  }
}));