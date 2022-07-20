import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  imageList: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: "200px",
    height: "200px",
    position: "relative",
  },
  audio: {
    width: "200px",
    height: "100px",
    position: "relative",
  },
  deleteWrapper: {
    borderRadius: '5px',
    position: "absolute",
    bottom: "5px",
    right: "46%",
    opacity: '0.8',
    backgroundColor: theme.palette.background.default,
    cursor: "pointer",
    boxShadow: "1px 1px 5px black",
    color: 'black'
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));