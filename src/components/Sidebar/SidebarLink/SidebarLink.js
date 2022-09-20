import React, { useState } from "react";
import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography, } from "@material-ui/core";
import { Inbox as InboxIcon } from "@material-ui/icons";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { useDispatch } from "react-redux";
import getWindowSize from '../../../hooks/useGetWindowSize'
import { MOBILE_WIDTH } from '../../../data/constants'
// styles
import useStyles from "./styles";
// components
import Dot from "../../Dot/Dot";
import { set_sidebar_toggle } from "../../../REDUX/actions/main.actions";

export default function SidebarLink({ link, icon, label, children, location, sidebar, nested, type, }) {
  let classes = useStyles();
  let dispatch = useDispatch()

  const toggleSideBar = () => dispatch(set_sidebar_toggle(!sidebar))
  const { width, height } = getWindowSize()

  // local
  let [isOpen, setIsOpen] = useState(false);
  let isLinkActive =
    link &&
    (location.pathname === link || location.pathname.indexOf(link) !== -1);

  if (type === "title")
    return (
      <Typography
        className={classnames(classes.linkText, classes.sectionTitle, {
          [classes.linkTextHidden]: !sidebar,
        })}
      >
        {label}
      </Typography>
    );

  if (type === "divider") return <Divider className={classes.divider} />;

  if (!children)
    return (
      <ListItem
        button
        component={link && Link}
        onClick={() => dispatch(set_sidebar_toggle(false))}
        to={link}
        className={classes.link}
        classes={{
          root: classnames(classes.linkRoot, {
            [classes.linkActive]: isLinkActive && !nested,
            [classes.linkNested]: nested,
          }),
        }}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {nested ? <Dot color={isLinkActive && "primary"} /> : icon}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !sidebar,
            }),
          }}
          primary={label}
        />
      </ListItem>
    );

  return (
    <>
      <ListItem
        button
        component={link && Link}
        onClick={(e) => toggleCollapse(e, width)}
        className={classes.link}
        to={link}
        disableRipple
      >
        <ListItemIcon
          className={classnames(classes.linkIcon, {
            [classes.linkIconActive]: isLinkActive,
          })}
        >
          {icon ? icon : <InboxIcon />}
        </ListItemIcon>
        <ListItemText
          classes={{
            primary: classnames(classes.linkText, {
              [classes.linkTextActive]: isLinkActive,
              [classes.linkTextHidden]: !sidebar,
            }),
          }}
          primary={label}
        />
      </ListItem>
      {children && (
        <Collapse
          in={isOpen && sidebar}
          timeout="auto"
          unmountOnExit
          className={classes.nestedList}
        >
          <List component="div" disablePadding>
            {children.map(childrenLink => (
              <SidebarLink
                key={childrenLink && childrenLink.link}
                location={location}
                sidebar={sidebar}
                classes={classes}
                nested
                {...childrenLink}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );

  // ###########################################################

  function toggleCollapse(e, width) {
    if (width <= MOBILE_WIDTH) {
      setIsOpen(true)
      e.preventDefault();
    } else {
      if (sidebar) {
        e.preventDefault();
        setIsOpen(true)
        toggleSideBar(sidebar)
      } else {
        setIsOpen(true)
        e.preventDefault();
        toggleSideBar(!sidebar)
      }
    }

  }
}
