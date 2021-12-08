import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Fab, Avatar, } from "@material-ui/core";
import {
    MailOutline as MailIcon,
    NotificationsNone as NotificationsIcon,
    Person as AccountIcon,
    Send as SendIcon,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "./styles";
// components
import { Badge, Typography } from "../Wrappers/Wrappers";
import UserAvatar from "../UserAvatar/UserAvatar";
import term from "../../terms";


const messages = [
    {
        id: 0,
        variant: "warning",
        name: "Jane Hew",
        message: "Hey! How is it going?",
        time: "9:32",
    },
    {
        id: 1,
        variant: "success",
        name: "Lloyd Brown",
        message: "Check out my new Dashboard",
        time: "9:18",
    },
    {
        id: 2,
        variant: "primary",
        name: "Mark Winstein",
        message: "I want rearrange the appointment",
        time: "9:15",
    },
    {
        id: 3,
        variant: "secondary",
        name: "Liana Dutti",
        message: "Good news from sale department",
        time: "9:09",
    },
];

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

function SideBtns() {
    // local
    let [mailMenu, setMailMenu] = useState(null);
    let [isMailsUnread, setIsMailsUnread] = useState(true);
    let [notificationsMenu, setNotificationsMenu] = useState(null);
    let [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
    let [profileMenu, setProfileMenu] = useState(null);

    let classes = useStyles();
    let avatar = 'https://i.pravatar.cc/'

    return (
        <>
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
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
            <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                onClick={e => {
                    setMailMenu(e.currentTarget);
                    setIsMailsUnread(false);
                }}
                className={classes.headerMenuButton}
            >
                <Badge
                    badgeContent={isMailsUnread ? messages.length : null}
                    color="secondary"
                >
                    <MailIcon classes={{ root: classes.headerIcon }} />
                </Badge>
            </IconButton>
            <IconButton
                aria-haspopup="true"
                color="inherit"
                className={classes.headerMenuButton}
                aria-controls="profile-menu"
                onClick={e => setProfileMenu(e.currentTarget)}
            >
                {avatar ? <Avatar alt="Remy Sharp" src={avatar} classes={{ root: classes.headerIcon }} /> : <AccountIcon classes={{ root: classes.headerIcon }} />}
            </IconButton>
            <Menu
                id="mail-menu"
                open={Boolean(mailMenu)}
                anchorEl={mailMenu}
                onClose={() => setMailMenu(null)}
                MenuListProps={{ className: classes.headerMenuList }}
                className={classes.headerMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem
            >
                <div className={classes.profileMenuUser}>
                    <Typography variant="h4" weight="medium">
                        {term('new_messages')}
                    </Typography>
                    <Typography
                        className={classes.profileMenuLink}
                        component="a"
                        color="secondary"
                    >
                        {messages.length} {term('new_messages')}
                    </Typography>
                </div>
                {messages.map(message => (
                    <MenuItem key={message.id} className={classes.messageNotification}>
                        <div className={classes.messageNotificationSide}>
                            <UserAvatar color={message.variant} name={message.name} />
                            <Typography size="sm" color="text" colorBrightness="secondary">
                                {message.time}
                            </Typography>
                        </div>
                        <div
                            className={classNames(
                                classes.messageNotificationSide,
                                classes.messageNotificationBodySide,
                            )}
                        >
                            <Typography weight="medium" gutterBottom>
                                {message.name}
                            </Typography>
                            <Typography color="text" colorBrightness="secondary">
                                {message.message}
                            </Typography>
                        </div>
                    </MenuItem>
                ))}
                <Fab
                    variant="extended"
                    color="primary"
                    aria-label="Add"
                    className={classes.sendMessageButton}
                >
                    {term('send_new_message')}
                    <SendIcon className={classes.sendButtonIcon} />
                </Fab>
            </Menu>
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
            <Menu
                id="profile-menu"
                open={Boolean(profileMenu)}
                anchorEl={profileMenu}
                onClose={() => setProfileMenu(null)}
                className={classes.headerMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem
            >
                <div className={classes.profileMenuUser}>
                    <Typography variant="h4" weight="medium">
                        John Smith
                    </Typography>
                </div>
                <MenuItem
                    className={classNames(
                        classes.profileMenuItem,
                        classes.headerMenuItem,
                    )}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('profile')}
                </MenuItem>
                <MenuItem
                    className={classNames(
                        classes.profileMenuItem,
                        classes.headerMenuItem,
                    )}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('tasks')}
                </MenuItem>
                <MenuItem
                    className={classNames(
                        classes.profileMenuItem,
                        classes.headerMenuItem,
                    )}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('messages')}
                </MenuItem>
                <div className={classes.profileMenuUser}>
                    <Typography
                        className={classes.profileMenuLink}
                        color="primary"
                        onClick={() => { }}
                    >
                        {term('sign_out')}
                    </Typography>
                </div>
            </Menu>
        </>
    )
}

export default SideBtns