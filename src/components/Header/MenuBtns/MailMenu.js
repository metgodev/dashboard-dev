import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Fab, } from "@material-ui/core";
import {
    MailOutline as MailIcon,
    Send as SendIcon,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "../styles";
// components
import { Badge, Typography } from "../../Wrappers/Wrappers";
import UserAvatar from "../../UserAvatar/UserAvatar";
import term from "../../../terms";

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

function MailMenu() {
    // local
    let [mailMenu, setMailMenu] = useState(null);
    let [isMailsUnread, setIsMailsUnread] = useState(true);

    let classes = useStyles();


    return (
        <>
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
            {/* mail-menu*/}
            <Menu
                id="mail-menu"
                open={Boolean(mailMenu)}
                anchorEl={mailMenu}
                onClose={() => setMailMenu(null)}
                MenuListProps={{ className: classes.headerMenuList }}
                className={classes.headerMenu}
                classes={{ paper: classes.profileMenu }}
                disableAutoFocusItem
                disablescrolllock={true.toString()}
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
        </>
    )
}

export default MailMenu
