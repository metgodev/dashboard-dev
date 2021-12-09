import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Avatar, } from "@material-ui/core";
import {
    Person as AccountIcon,
} from "@material-ui/icons";
import classNames from "classnames";
// styles
import useStyles from "../styles";
// components
import { Typography } from "../../Wrappers/Wrappers";
import term from "../../../terms";
import { useNavigate } from "react-router";

function ProfileMenu() {
    // local
    let [profileMenu, setProfileMenu] = useState(null);

    let classes = useStyles();
    let avatar = 'https://i.pravatar.cc/'
    let navigate = useNavigate()

    return (
        <>
            <IconButton
                aria-haspopup="true"
                color="inherit"
                className={classes.headerMenuButton}
                aria-controls="profile-menu"
                onClick={e => setProfileMenu(e.currentTarget)}
            >
                {avatar ? <Avatar alt="Remy Sharp" src={avatar} classes={{ root: classes.headerIcon }} /> : <AccountIcon classes={{ root: classes.headerIcon }} />}
            </IconButton>
            {/*profile-menu*/}
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
                        onClick={() => { navigate('/login') }}
                    >
                        {term('sign_out')}
                    </Typography>
                </div>
            </Menu>
        </>
    )
}

export default ProfileMenu
