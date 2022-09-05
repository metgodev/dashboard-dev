import React, { useEffect } from "react";
import { CircularProgress, Drawer, IconButton, List } from "@material-ui/core";
import {
    HomeOutlined as HomeIcon,
    EventOutlined as Event,
    LocalMallOutlined as Businesses,
    LocationOnOutlined as Locations,
    TimelineOutlined as Route,
    LiveHelpOutlined as FAQIcon,
    ArrowForward as ArrowBackIcon,
    CardGiftcard,
    PeopleOutlined as People,
    MapOutlined as Map,
    HelpOutlineOutlined as Support,
} from "@material-ui/icons";
// styles
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import useStyles from "./styles";
// components
import SidebarLink from "./SidebarLink/SidebarLink";
//global
import { useSelector, useDispatch } from "react-redux";
import { set_mobile_toggle, set_sidebar_toggle } from "../../REDUX/actions/main.actions";
import GetPermissions from "../../hooks/GetPermissions";
import LISTENER from "../../data/listener";
import { Box } from "@mui/system";
import { getLink } from "./sidebarConfig";

const Sidebar = React.memo(({ location }) => {
    let classes = useStyles();
    let theme = useTheme();
    let dispatch = useDispatch()
    //global
    const { sidebar, mobile } = useSelector(s => s.mainReducer)
    const toggleSideBar = () => dispatch(set_sidebar_toggle(!sidebar))
    const user = useSelector(s => s.userReducer.userDetails)
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions(user)

    useEffect(() => {
        window.addEventListener(LISTENER.TYPES.RESIZE, handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener(LISTENER.TYPES.RESIZE, handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={mobile ? "permanent" : "temporary"}
            anchor={theme.direction === 'ltr' ? 'right' : 'left'}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: sidebar,
                    [classes.drawerClose]: !sidebar,
                }),
            }}
            open={sidebar}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={toggleSideBar}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(classes.headerIcon, classes.headerIconCollapse),
                        }}
                    />
                </IconButton>
            </div>
            <List >
                {Boolean(Object.keys(permissions).length) && Boolean(Object.keys(userDetails).length) ?
                    getLink(userDetails).map(link => {
                        if (link.permission === undefined || permissions[link.permission]) {
                            return (
                                (
                                    <SidebarLink
                                        key={link.id}
                                        location={location}
                                        sidebar={sidebar}
                                        {...link}
                                    />
                                )
                            )
                        }
                    })
                    :
                    <Box sx={{ marginTop: '20px', width: '100%', display: 'flex', justifyContent: 'center' }}>
                        <CircularProgress />
                    </Box>
                }
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        let windowWidth = window.innerWidth;
        let breakpointWidth = theme.breakpoints.values.md;
        let isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && mobile) {
            dispatch(set_mobile_toggle(false))
        } else if (!isSmallScreen && !mobile) {
            dispatch(set_mobile_toggle(true))
        }
    }
})

export default Sidebar;
