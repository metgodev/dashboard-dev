import { makeStyles } from "@material-ui/styles";
import FIXED_STYLES from "../../data/fixed_styles";

export default makeStyles(theme => ({
  pageTitleContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: '5px',
    marginBottom: '5px',
    width: '100%',
    height: FIXED_STYLES.PAGE_TITLE,
    alignItems: "center",
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
  boxWrapper: {
    display: 'flex',
    alignItems: 'end',
  },
}));
