import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import AGTable from '../../components/Tables/AGTable'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_STATES from '../../data/modal_states'
import MODAL_TYPES from '../../data/modal_types'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import term from '../../terms'

function UsersTable() {

    const [open, setOpen] = useState(false)
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);

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
            <AGTable display={BACK_ROUTES.USERS} action={openDialog} />
            <PopupDialog title={term('users')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.USERS} type={dialogType} />
        </div>
    )
}

export default UsersTable
