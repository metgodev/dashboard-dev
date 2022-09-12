import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import AGTable from '../../components/Tables/AGTable'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_STATES from '../../data/modal_states'
import MODAL_TYPES from '../../data/modal_types'
import useGetService from '../../hooks/useGetService'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import term from '../../terms'

function UsersTable() {

    const [open, setOpen] = useState(false)
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);
    const [options, setOptions] = useState({})

    const { area } = useSelector(s => s.mainRememberReducer)

    const roles = useGetService("roles", "roles", { areaId: area.id }, area, false)

    useEffect(() => {
        if (roles.data.length > 0) {
            setOptions(prev => ({ ...prev, roles: roles.data }))
        }
    }, [roles])

    const dispatch = useDispatch()

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.EDIT)
        }
        setOpen(!open)
    }

    return (
        <div>
            <PageTitle title={term('users')} />
            {Boolean(Object.keys(options).length) && <AGTable display={BACK_ROUTES.USERS} action={openDialog} options={options} />}
            <PopupDialog title={term('users')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.USERS} type={dialogType} />
        </div>
    )
}

export default UsersTable
