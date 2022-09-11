import { useEffect, useState } from "react"
import ROLES from "../data/roles"

const GetRole = (user) => {

    const [role, setRole] = useState(null)

    useEffect(() => {
        if (user !== undefined && user !== null && Object.keys(user).length > 0 && user?.roles !== undefined && role === null) {
            if (user.roles.length === 2 && user.roles[1].roleName === ROLES.BUSINESS_OWNER) {
                setRole(ROLES.BUSINESS_OWNER)
            } else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.SUPER_ADMIN) {
                setRole(ROLES.SUPER_ADMIN)
            } else if (user.roles.length === 2 && user.roles[1].roleName === ROLES.ADMIN) {
                setRole(ROLES.ADMIN)
            }
        } else {
            setRole(ROLES.MEMBER)
        }
    }, [user])

    return role
}

export default GetRole