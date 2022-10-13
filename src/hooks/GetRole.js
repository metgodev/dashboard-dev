import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ROLES from "../data/roles"

const GetRole = (user) => {

    const userDetails = useSelector(s => s.userReducer.userDetails)

    const [role, setRole] = useState(null)

    useEffect(() => {
        if (userDetails !== undefined && userDetails !== null && Object.keys(userDetails).length > 0 && userDetails?.roles !== undefined && role === null) {
            if (userDetails.roles.length === 2 && userDetails.roles[1].roleName === ROLES.BUSINESS_OWNER) {
                setRole(ROLES.BUSINESS_OWNER)
            } else if (userDetails.roles.length === 2 && userDetails.roles[1].roleName === ROLES.SUPER_ADMIN) {
                setRole(ROLES.SUPER_ADMIN)
            } else if (userDetails.roles.length === 2 && userDetails.roles[1].roleName === ROLES.ADMIN) {
                setRole(ROLES.ADMIN)
            } else if (userDetails.roles.length === 2 && userDetails.roles[1].roleName === ROLES.VIEWER) {
                setRole(ROLES.VIEWER)
            }
        } else {
            setRole(ROLES.MEMBER)
        }
    }, [user])

    return role
}

export default GetRole