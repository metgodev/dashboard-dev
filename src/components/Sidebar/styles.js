import { makeStyles } from "@material-ui/styles";

const drawerWidth = 240;

export default makeStyles(theme => ({
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: "hidden",
    //animation
    // transition: theme.transitions.create("width", {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  drawerClose: {
    //animation
    // transition: theme.transitions.create('width', {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
    overflowX: "hidden",
    width: theme.spacing(12),
    [theme.breakpoints.down("sm")]: {
      width: drawerWidth,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  mobileBackButton: {
    alignSelf: theme.direction !== 'ltr' ? 'end' : 'start',
    color: theme.palette.primary.main,
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(3),
    [theme.breakpoints.only("sm")]: {
      marginTop: theme.spacing(0.625),
    },
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  headerIcon: {
    fontSize: 28,
    color: theme.palette.primary.main,
  },
  headerIconCollapse: {
    color: theme.palette.primary.main,
  },
}));
