import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import {
    NotificationsNone as NotificationsIcon,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "../styles";
// components
import { Badge, Typography } from "../../Wrappers/Wrappers";
import { notifications } from '../config'

function NotifyMenu() {
    // local
    let [notificationsMenu, setNotificationsMenu] = useState(null);
    let [isNotificationsUnread, setIsNotificationsUnread] = useState(true);

    let classes = useStyles();

    return (
        <>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="notify-menu"
                onClick={e => {
                    setNotificationsMenu(e.currentTarget);
                    setIsNotificationsUnread(false);
                }}
                className={classes.headerMenuButton}
            >
                <Badge
                    badgeContent={isNotificationsUnread ? notifications.length : null}
                    color="warning"
                >
                    <NotificationsIcon classes={{ root: classes.headerIcon }} />
                </Badge>
            </IconButton>
            {/*notifications-menu*/}
            <Menu
                id="notifications-menu"
                open={Boolean(notificationsMenu)}
                anchorEl={notificationsMenu}
                onClose={() => setNotificationsMenu(null)}
                className={classes.headerMenu}
                disableAutoFocusItem
                disablescrolllock={true.toString()}
            >
                {notifications.map(({ type, message, id, color }) => (
                    <MenuItem
                        key={id}
                        onClick={() => setNotificationsMenu(null)}
                        className={classes.headerMenuItem}
                    >
                        <div
                            className={classNames(
                                classes.messageNotificationSide,
                                classes.messageNotificationBodySide,
                            )}
                        >
                            <Typography weight="medium" gutterBottom>
                                {type}
                            </Typography>
                            <Typography color="text" colorBrightness="secondary">
                                {message}
                            </Typography>
                        </div>
                    </MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default NotifyMenu
