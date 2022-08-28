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
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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
import GetPermissions from "../../hooks/GetPermissions";
import LISTENER from "../../data/listener";

const structure = [
    {
        id: 0, label: term('admin'), link: "/admin/authority", icon: <AdminPanelSettingsOutlinedIcon />,
        children: [
            { label: term('manage_area'), link: "/admin/authority" },
            { label: term('manage_tags'), link: "/admin/tagcategories" },
            { label: term('manage_users'), link: "/admin/users" },
        ],
        permission: 'admin'
    },
    { id: 1, label: term('dashboard'), link: "/dashboard", icon: <HomeIcon />, permission: 'dashboard' },
    { id: 2, label: term('businesses'), link: "/businesses", icon: <Businesses />, permission: 'business' },
    { id: 3, label: term('events'), link: "/events", icon: <Event />, permission: 'events' },
    { id: 4, label: term('points'), link: "/locations", icon: <Locations />, permission: 'locations' },
    { id: 5, label: term('routes'), link: "/routes", icon: <Route />, permission: 'routes' },
    { id: 5, label: term('products'), link: "/products", icon: <ShoppingCartOutlinedIcon />, permission: 'products' },
    { id: 6, label: term('voucher'), link: "/voucher", icon: <CardGiftcard />, permission: 'vouchers' },
    { id: 7, label: term('local_campaigns'), link: "/campaign", icon: <CampaignOutlinedIcon />, permission: 'campaign' },
    { id: 8, label: term('map'), link: "/map", icon: <Map />, permission: 'map' },
    { id: 9, type: "divider", },
    { id: 10, type: 'title', label: term('help') },
    { id: 11, label: term('support'), link: "/support", icon: <Support />, permission: 'support' },
    { id: 13, label: term('faq'), link: "/FAQ", icon: <FAQIcon />, support: 'faq' },
    { id: 14, type: "divider" },
];

const Sidebar = React.memo(({ location }) => {
    let classes = useStyles();
    let theme = useTheme();
    let dispatch = useDispatch()
    //global
    const { sidebar, mobile } = useSelector(s => s.mainReducer)
    const toggleSideBar = () => dispatch(set_sidebar_toggle(!sidebar))
    const user = useSelector(s => s.userReducer.userDetails)
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
                {structure.map(link => {
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

                })}
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
