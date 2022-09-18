import React, { useState } from "react";
import {
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert as MoreIcon } from "@material-ui/icons";
import classnames from "classnames";
// styles
import useStyles from "./styles";
import term from "../../terms";

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  height
}) {
  let classes = useStyles();

  // local
  let [moreref, setMoreref] = useState(null);
  let [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper} style={{ height: height || '100%' }}>
      <Paper className={classes.paper} classes={{ root: classes.widgetRoot }}>
        <div className={classes.widgetHeader}>
          {header ? (
            header
          ) : (
            <>
              <Typography variant="h5" color="textSecondary">
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  ref={setMoreref}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </>
          )}
        </div>
        <div
          className={classnames({
            [classes.widgetBody]: !noBodyPadding,
            [bodyClass]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreref}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
        disablescrolllock={true.toString()}
      >
        <MenuItem>
          <Typography>{term('copy')}</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>{term('print')}</Typography>
        </MenuItem>
      </Menu>
    </div >
  );
}
