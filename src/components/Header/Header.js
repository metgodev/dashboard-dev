import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, } from "@material-ui/core";
import { Menu as MenuIcon, ArrowBack as ArrowBackIcon, } from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";
import Logo from "../../Assets/images/metroLogo.png"
// components
import { Typography } from "../Wrappers/Wrappers";
import SideBtns from "./SideBtns";
import { em } from "../../utils/document";
import term from "../../terms";



export default function Header() {
  let classes = useStyles();

  // local
  let [layoutToggle, setlayoutToggle] = useState(false);

  return (
    <div style={{ direction: 'ltr' }}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img src={Logo} alt="logo" className={classes.logotype} width={em(2)} />
          <Typography variant="h6" weight="medium" className={classes.logotype}>
            {term('metro_travel')}
          </Typography>
          <div className={classes.grow} />
          <SideBtns />
          <IconButton
            color="inherit"
            onClick={() => setlayoutToggle(!layoutToggle)}
            className={classNames(
              classes.headerMenuButton,
              classes.headerMenuButtonCollapse,
            )}
          >
            {layoutToggle ? (
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
    </div>
  );
}
