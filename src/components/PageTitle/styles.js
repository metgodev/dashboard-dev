import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2.5),
  },
  typo: {
    color: theme.palette.text.hint,
  },
  button: {
    color: theme.palette.primary.main,
    boxShadow: theme.customShadows.widget,
    textTransform: "none",
    "&:active": {
      boxShadow: theme.customShadows.widgetWide,
    },
  },
}));
