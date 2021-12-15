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
import term from "../../../terms";


const notifications = [
    { id: 0, color: "warning", message: "Check out this awesome ticket" },
    {
        id: 1,
        color: "success",
        type: "info",
        message: "What is the best way to get ...",
    },
    {
        id: 2,
        color: "secondary",
        type: "notification",
        message: "This is just a simple notification",
    },
    {
        id: 3,
        color: "primary",
        type: "e-commerce",
        message: "12 new orders has arrived today",
    },
];

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
