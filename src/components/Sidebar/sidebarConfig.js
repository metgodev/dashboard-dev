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

import { BUSINESS_OWNER_ROUTES, ROUTES } from '../../data/routes'
import term from "../../terms";
import ROLES from "../../data/roles";

const adminLinks = [
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

const businessOwnerLinks = [
    { id: 1, label: term('dashboard'), link: BUSINESS_OWNER_ROUTES.DASHBOARD, icon: <HomeIcon />, permission: 'dashboard' },
    { id: 2, label: term('businesses'), link: BUSINESS_OWNER_ROUTES.BUSINESSES, icon: <Businesses />, permission: 'business' },
    { id: 3, label: term('events'), link: BUSINESS_OWNER_ROUTES.EVENTS, icon: <Event />, permission: 'events' },
    { id: 8, label: term('map'), link: BUSINESS_OWNER_ROUTES.MAP, icon: <Map />, permission: 'map' },
    { id: 9, type: "divider", },
    { id: 11, label: term('support'), link: BUSINESS_OWNER_ROUTES.SUPPORT, icon: <Support />, permission: 'support' },
    { id: 13, label: term('faq'), link: BUSINESS_OWNER_ROUTES.FAQ, icon: <FAQIcon />, support: 'faq' },
    { id: 14, type: "divider" },
];

export const getLink = (user) => {
    if (user.roles.length === 1) {
        return adminLinks
    }
    else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.BUSINESS_OWNER) {
        return businessOwnerLinks
    }
    else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.SUPER_ADMIN) {
        return adminLinks
    }
}