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
import { ROUTES } from '../../../data/routes'
import ProfileModal from "../../ProfileModal/ProfileModal";

function ProfileMenu() {
    // local
    let [profileMenu, setProfileMenu] = useState(null);
    const [openProfileModal, setOpenProfileModal] = useState(false)
    //global 
    const { user } = useSelector(state => state.mainRememberReducer)
    const userDetails = useSelector(s => s.userReducer.userDetails)

    let classes = useStyles();
    let avatar = `${AVATAR_URL + user.fn}`
    let navigate = useNavigate()
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(set_user_details({}))
        client.logout();
        window.localStorage.clear()
        navigate(ROUTES.LOGIN)
    }

    return (
        <>
            <ProfileModal open={openProfileModal} setOpen={setOpenProfileModal} user={userDetails} />
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
                    onClick={() => setOpenProfileModal(true)}
                >
                    <AccountIcon className={classes.profileMenuIcon} /> {term('profile')}
                </MenuItem>
                {/* <MenuItem
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
