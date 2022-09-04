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
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
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
import ROUTES from '../../data/routes'
import { Box } from "@mui/system";

const structure = [
    {
        id: 0, label: term('admin'), icon: <AdminPanelSettingsOutlinedIcon />,
        children: [
            { label: term('manage_area'), link: ROUTES.AUTHORITY },
            { label: term('manage_tags'), link: ROUTES.TAG_CATEGORIES },
            { label: term('manage_users'), link: ROUTES.USERS },
        ],
        permission: 'admin'
    },
    { id: 1, label: term('dashboard'), link: ROUTES.DASHBOARD, icon: <HomeIcon />, permission: 'dashboard' },
    { id: 2, label: term('businesses'), link: ROUTES.BUSINESSES, icon: <Businesses />, permission: 'business' },
    { id: 3, label: term('events'), link: ROUTES.EVENTS, icon: <Event />, permission: 'events' },
    { id: 4, label: term('points'), link: ROUTES.POINTS, icon: <Locations />, permission: 'locations' },
    { id: 5, label: term('routes'), link: ROUTES.TRACKS, icon: <Route />, permission: 'routes' },
    { id: 5, label: term('products'), link: ROUTES.PRODUCTS, icon: <ShoppingCartOutlinedIcon />, permission: 'products' },
    { id: 5, label: term('calendar'), link: ROUTES.CALENDAR, icon: <CalendarMonthOutlinedIcon />, permission: 'calendar' },
    { id: 6, label: term('voucher'), link: ROUTES.VOUCHER, icon: <CardGiftcard />, permission: 'vouchers' },
    { id: 7, label: term('local_campaigns'), link: ROUTES.CAMPAIGN, icon: <CampaignOutlinedIcon />, permission: 'campaign' },
    { id: 8, label: term('map'), link: ROUTES.MAP, icon: <Map />, permission: 'map' },
    { id: 9, type: "divider", },
    { id: 10, type: 'title', label: term('help') },
    { id: 11, label: term('support'), link: ROUTES.SUPPORT, icon: <Support />, permission: 'support' },
    { id: 13, label: term('faq'), link: ROUTES.FAQ, icon: <FAQIcon />, support: 'faq' },
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
                {Boolean(Object.keys(permissions).length) ? structure.map(link => {
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
