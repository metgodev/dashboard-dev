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
import client from "../../../API/metro";
import { useNavigate } from "react-router";
import term from "../../../terms";
import { useDispatch, useSelector } from "react-redux";
import { set_user_details } from "../../../REDUX/actions/user.actions";
import { AVATAR_URL } from "../config";
import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../../data/routes'
import { set_admin_notification } from "../../../REDUX/actions/main.actions";
import AdminNotifications from "../../AdminNotifications/AdminNotifications";
import GetPermissions from "../../../hooks/GetPermissions";
import GetRole from "../../../hooks/GetRole";
import { PLACEHOLDER_PROFILE_IMAGE } from '../../../data/constants'

function ProfileMenu() {
    // local
    let [profileMenu, setProfileMenu] = useState(null);
    //global 
    const { user } = useSelector(state => state.mainRememberReducer)
    const adminNotification = useSelector(s => s.mainReducer.adminNotification)
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions(userDetails)
    const role = GetRole(userDetails)

    let classes = useStyles();
    let avatar = userDetails?.profilePicture ? userDetails.profilePicture.url : PLACEHOLDER_PROFILE_IMAGE
    let navigate = useNavigate()
    const dispatch = useDispatch()
    let currentHref = window.location.href

    const logout = () => {
        dispatch(set_user_details({}))
        client.logout();
        window.localStorage.clear()
        if (currentHref.split('/').includes('business')) {
            navigate(BUSINESS_OWNER_ROUTES.LOGIN)
        } else {
            navigate(ROUTES.LOGIN)
        }
    }

    const handleProfileClicked = () => {
        if (currentHref.split('/').includes('business')) {
            navigate(BUSINESS_OWNER_ROUTES.PROFILE)
        } else {
            navigate(ROUTES.PROFILE)
        }
        setProfileMenu(null)
    }

    const handleNotificationClicked = () => {
        dispatch(set_admin_notification(true))
        setProfileMenu(null)
    }

    return (
        <>
            {permissions?.adminNotification &&
                <AdminNotifications open={adminNotification} />
            }
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
                disablescrolllock={true.toString()}
            >
                <div className={classes.profileMenuUser}>
                    <Typography variant="h4" weight="medium">
                        {`${user.fn} ${user.ln}`}
                    </Typography>
                </div>
                <MenuItem
                    className={classNames(
                        classes.profileMenuItem,
                        classes.headerMenuItem,
                    )}
                    onClick={() => handleProfileClicked()}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('profile')}
                </MenuItem>
                {permissions?.adminNotification &&
                    <MenuItem
                        className={classNames(
                            classes.profileMenuItem,
                            classes.headerMenuItem,
                        )}
                        onClick={() => handleNotificationClicked()}
                    >
                        <AccountIcon className={classes.profileMenuIcon} /> {term('tasks')}
                    </MenuItem>}
                {/* <MenuItem
                    className={classNames(
                        classes.profileMenuItem,
                        classes.headerMenuItem,
                    )}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('messages')}
                </MenuItem> */}
                <div className={classes.profileMenuUser}>
                    <Typography
                        className={classes.profileMenuLink}
                        color="primary"
                        onClick={() => logout()}
                    >
                        {term('sign_out')}
                    </Typography>
                </div>
            </Menu>
        </>
    )
}

export default ProfileMenu
