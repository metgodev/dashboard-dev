import { useEffect, useState } from "react"
import { _get } from '../API/service'
import ROUTES from '../data/back_routes'
import PERMISSIONS from '../data/permissions'

const GetPermissions = (roleId) => {

    const [permissions, setPermissions] = useState({})

    useEffect(() => {
        if (roleId !== undefined && roleId !== null) {
            (async () => {
                try {
                    const allRoles = await _get(ROUTES.ROLES)
                    //const role = allRoles.data.find(role => role._id === roleId).roleName
                    setPermissions(PERMISSIONS.METRO_SUPER_ADMIN) //CHANGE WHEN BACK CHANGE
                } catch (e) {

                }
            })()
        }
    }, [roleId])

    return permissions
}

export default GetPermissions