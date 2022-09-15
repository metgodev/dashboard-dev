import ROLES from "../data/roles";
import { ROUTES } from "../data/routes"
import { Protecte } from './rootHelper.js';
import { Routes, Route, Navigate, } from 'react-router-dom'
import Error from '../pages/error/Error';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import Businesses from '../pages/businesses/Businesses';
import LocalCampaigns from '../pages/localCampains/LocalCampaigns';
import Events from '../pages/events/Events';
import PointsOfInterest from '../pages/points/PointsOfInterest';
import Tracks from '../pages/tracks/Tracks';
import Voucher from '../pages/voucher/Voucher';
import Maps from '../pages/maps/Maps';
import Support from '../pages/support/Support';
import FAQ from '../pages/FAQ/FAQ';
import Products from '../pages/products/Products'
import Calendar from '../pages/calendar/Calendar'
import GetPermissions from "../hooks/GetPermissions";
import Profile from "../pages/profile/Profile";
import { useSelector } from "react-redux";
import BasicRoutes from "./routes/BasicRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import BusinessOwnerRoutes from "./routes/BusinessOwnerRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ViewerRoutes from "./routes/ViewerRoutes";

const GetRoutes = () => {

    const userDetails = useSelector(s => s.userReducer.userDetails)
    const user = useSelector(s => s.mainRememberReducer.user)
    const permissions = GetPermissions(userDetails)

    if (Object.keys(userDetails).length === 0) {
        return (
            <BasicRoutes />
        )
    }
    else if (userDetails.roles.length === 1 && userDetails.roles[0].roleName === ROLES.MEMBER) {
        return (
            <MemberRoutes permissions={permissions} user={user} />
        )
    }
    else if (userDetails.roles.length === 2) {
        switch (userDetails.roles[1].roleName) {
            case ROLES.BUSINESS_OWNER:
                return (
                    <BusinessOwnerRoutes permissions={permissions} user={user} />
                )
            case ROLES.SUPER_ADMIN:
                return (
                    <SuperAdminRoutes permissions={permissions} user={user} />
                )
            case ROLES.ADMIN:
                return (
                    <AdminRoutes permissions={permissions} user={user} />
                )
            case ROLES.VIEWER:
                return (
                    <ViewerRoutes permissions={permissions} user={user} />
                )
        }
    }
}

export default GetRoutes