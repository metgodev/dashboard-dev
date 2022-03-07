import React, { useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
// styles
import { useTheme } from "@material-ui/styles";
import classNames from "classnames";
import useStyles from "./styles";
// components
import SidebarLink from "./SidebarLink/SidebarLink";
//global
import { useSelector, useDispatch } from "react-redux";
import { set_mobile_toggle, set_sidebar_toggle } from "../../REDUX/actions/main.actions";
import term from "../../terms";

const structure = [
    {
        id: 0, label: term('admin'), icon: <AdminPanelSettingsOutlinedIcon />,
        children: [
            { label: term('manage_areas'), link: "/admin/areas" },
            { label: term('manage_authorities'), link: "/admin/authorities" },
            // { label: term('manage_tags'), link: "/admin/tags" },
        ],
    },
    { id: 1, label: term('dashboard'), link: "/dashboard", icon: <HomeIcon /> },
    { id: 2, label: term('businesses'), link: "/businesses", icon: <Businesses />, },
    { id: 3, label: term('events'), link: "/events", icon: <Event /> },
    { id: 4, label: term('points'), link: "/locations", icon: <Locations />, },
    { id: 5, label: term('routes'), link: "/routes", icon: <Route />, },
    // { id: 6, label: term('voucher'), link: "/voucher", icon: <CardGiftcard />, },
    // { id: 7, label: term('users'), link: "/users", icon: <People />, },
    { id: 8, label: term('map'), link: "/map", icon: <Map />, },
    { id: 9, type: "divider" },
    { id: 10, type: 'title', label: term('help') },
    { id: 11, label: term('support'), link: "/support", icon: <Support />, },
    { id: 13, label: term('faq'), link: "/FAQ", icon: <FAQIcon /> },
    { id: 14, type: "divider" },
];

const SideBar = React.memo(({ location }) => {
    let classes = useStyles();
    let theme = useTheme();
    let dispatch = useDispatch()
    //global
    const { sidebar, mobile } = useSelector(s => s.mainReducer)
    const toggleSideBar = () => dispatch(set_sidebar_toggle(!sidebar))

    useEffect(() => {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
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
                {structure.map(link => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        sidebar={sidebar}
                        {...link}
                    />
                ))}
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

export default SideBar;
