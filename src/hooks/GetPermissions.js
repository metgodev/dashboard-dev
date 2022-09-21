import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { _get } from '../API/service'
import PERMISSIONS from '../data/permissions'
import ROLES from "../data/roles"

const GetPermissions = () => {

    const user = useSelector(s => s.userReducer.userDetails)

    const [permissions, setPermissions] = useState({})

    useEffect(() => {
        if (user !== undefined && user !== null && Object.keys(user).length > 0 && user?.roles !== undefined) {
            if (user.roles.length === 2 && user.roles[1].roleName === ROLES.BUSINESS_OWNER) {
                setPermissions(PERMISSIONS.METRO_BUSINESS_OWNER)
            }
            else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.SUPER_ADMIN) {
                setPermissions(PERMISSIONS.METRO_SUPER_ADMIN)
            }
            else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.ADMIN) {
                setPermissions(PERMISSIONS.METRO_ADMIN)
            }
            else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.VIEWER) {
                setPermissions(PERMISSIONS.METRO_VIEWER)
            }
        } else {
            setPermissions(PERMISSIONS.METRO_MEMBER)
        }
    }, [user])

    return permissions
}

export default GetPermissions