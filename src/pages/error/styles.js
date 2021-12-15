import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  container: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#E8EAFC',
    position: "absolute",
    top: 0,
    left: 0,
  },
  logotype: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logotypeText: {
    fontWeight: 500,
    color: "white",
    marginLeft: theme.spacing(2),
  },
  logotypeIcon: {
    width: 70,
    marginRight: theme.spacing(2),
  },
  divRoot: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'transparent',
    width: "100%",
    heigh: "100%",
  },
  errorCode: {
    fontSize: 148,
    fontWeight: 600,
  },
  backButton: {
    position: 'absolute',
    bottom: 30,
    textTransform: "none",
    fontSize: 22,
    color: '#000',
  },
}));
