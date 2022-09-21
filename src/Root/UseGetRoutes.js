import ROLES from "../data/roles";
import GetPermissions from "../hooks/GetPermissions";
import { useSelector } from "react-redux";
import BasicRoutes from "./routes/BasicRoutes";
import MemberRoutes from "./routes/MemberRoutes";
import BusinessOwnerRoutes from "./routes/BusinessOwnerRoutes";
import SuperAdminRoutes from "./routes/SuperAdminRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import ViewerRoutes from "./routes/ViewerRoutes";
import { CircularProgress } from "@material-ui/core";
import { Box } from "@mui/material";
import useStyles from './styles'

const GetRoutes = () => {

    const userDetails = useSelector(s => s.userReducer.userDetails)
    const user = useSelector(s => s.mainRememberReducer.user)
    const permissions = GetPermissions()
    const classes = useStyles()

    if (Object.keys(userDetails).length === 0) {
        if (window.localStorage.getItem('metgo-jwt')) {
            return (
                <Box className={classes.container}>
                    <CircularProgress size={50} />
                </Box>
            )
        }
        return (
            <BasicRoutes permissions={permissions} user={user} />
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