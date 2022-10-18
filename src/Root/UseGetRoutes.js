import ROLES from "../data/roles";
import GetPermissions from "../hooks/GetPermissions";
import { useSelector } from "react-redux";
import MemberRoutes from "./routes/MemberRoutes";
import BusinessOwnerRoutes from "./routes/BusinessOwnerRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ViewerRoutes from "./routes/ViewerRoutes";
import { Routes, Route, Navigate } from "react-router-dom";
import { BUSINESS_OWNER_ROUTES, ROUTES } from "../data/routes";
import LoginChoice from "../pages/login/LoginChoice";
import Login from '../pages/login/Login'

const GetRoutes = () => {

    const userDetails = useSelector(s => s.userReducer.userDetails)
    const user = useSelector(s => s.mainRememberReducer.user)
    const permissions = GetPermissions()

    if (Object.keys(userDetails).length === 0 || window.localStorage.getItem('metgo-jwt') === null) {
        return (
            <Routes>
                <Route path={ROUTES.ROOT} element={<LoginChoice />} />
                <Route exact path={ROUTES.LOGIN} element={<Login />} />
                <Route exact path={BUSINESS_OWNER_ROUTES.LOGIN} element={<Login />} />
                <Route exact path={ROUTES.CHOOSE_LOGIN} element={<LoginChoice />} />
            </Routes>
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