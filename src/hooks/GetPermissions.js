import { useEffect, useState } from "react"
import { _get } from '../API/service'
import PERMISSIONS from '../data/permissions'
import ROLES from "../data/roles"

const GetPermissions = (user) => {

    const [permissions, setPermissions] = useState({})

    useEffect(() => {
        if (user !== undefined && user !== null && Object.keys(user).length > 0 && user?.roles !== undefined) {
            if (user.roles.length === 2 && user.roles[1].roleName === ROLES.BUSINESS_OWNER) {
                setPermissions(PERMISSIONS.METRO_BUSINESS_OWNER)
            } else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.SUPER_ADMIN) {
                setPermissions(PERMISSIONS.METRO_SUPER_ADMIN)
            } else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.ADMIN) {
                setPermissions(PERMISSIONS.METRO_ADMIN)
            }
        } else {
            setPermissions(PERMISSIONS.METRO_MEMBER)
        }
    }, [user])

    return permissions
}

export default GetPermissions