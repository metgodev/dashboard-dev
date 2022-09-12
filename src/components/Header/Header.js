import React from "react";
import { AppBar, Toolbar, IconButton, Box, } from "@material-ui/core";
import { Menu as MenuIcon, ArrowForward as ArrowBackIcon } from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";
import Logo from "../../Assets/images/metroLogo.png"
// components
import { Typography } from "../Wrappers/Wrappers";
import SideBtns from "./SideBtns";
import { em } from "../../utils/document";
import term from "../../terms";
// global
import { useDispatch, useSelector } from "react-redux";
import { set_sidebar_toggle } from "../../REDUX/actions/main.actions"
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../data/routes";

//additional commit
const Header = React.memo(() => {
  let classes = useStyles();
  const navigate = useNavigate()
  let { sidebar } = useSelector(s => s.mainReducer)
  let dispatch = useDispatch();

  const toggleSideBar = () => {
    dispatch(set_sidebar_toggle(!sidebar))
  }

  const handleLogoClick = () => {
    navigate(ROUTES.DASHBOARD)
  }

  return (
    <Box style={{ direction: 'ltr', paddingTop: em(1) }}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Box className={classes.logoContainer} onClick={() => handleLogoClick()}>
            <img src={Logo} alt="logo" className={classes.logotype} width={em(2)} />
            <Typography variant="h3" weight="medium" color="text" className={classes.logotype}>
              {term('met_go')}
            </Typography>
          </Box>
          <div className={classes.grow} />
          <SideBtns />
          <IconButton
            color="inherit"
            onClick={() => { toggleSideBar() }}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            {sidebar ? (
              <ArrowBackIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }} />
            ) : (
              <MenuIcon
                classes={{
                  root: classNames(
                    classes.headerIcon,
                    classes.headerIconCollapse,
                  ),
                }} />)}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
})



export default Header;