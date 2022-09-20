import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { AddCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AGTable from '../../components/Tables/AGTable'
import MODAL_STATES from '../../data/modal_states'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_TYPES from '../../data/modal_types'
import getWindowSize from '../../hooks/useGetWindowSize'
import MobileTable from '../../components/MobileTable/MobileTable'
import { MOBILE_WIDTH } from '../../data/constants'

function AuthorityMng() {
    const dispatch = useDispatch()
    //dialog
    const [autorityOpen, setAutorityOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);

    const { width, height } = getWindowSize();

    const openAuthorityDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.ADD)
        }
        setAutorityOpen(!autorityOpen)
    }

    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('add_new_authority'), func: openAuthorityDialog, buttonIcon: <AddCircleOutline /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('authorities')} />
            {width > MOBILE_WIDTH && <AGTable display={BACK_ROUTES.AUTHORITIES} action={openAuthorityDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.AUTHORITIES} action={openAuthorityDialog} />}
            <PopupDialog open={autorityOpen} setOpen={setAutorityOpen} type={dialogType} title={term('authority')} tabs={MODAL_TYPES.AUTHORITY} maxWidth={'sm'} />
        </Box>
    )
}

export default AuthorityMng

