import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  imageList: {
    width: '95%'
  },
  image: {
    width: "100%",
    height: "100%",
    position: "relative",
    padding: '7px'
  },
  audio: {
    width: "210px",
    height: "100px",
    position: "relative",
  },
  deleteWrapper: {
    borderRadius: '5px',
    position: "absolute",
    top: "10px",
    right: "10px",
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
    boxShadow: '0 0 0.2rem rgba(0,0,0,0.5)',
    gap: 15
  }
}));