import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AGTable from '../../components/Tables/AGTable'
import MODAL_STATES from '../../data/modal_states'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_TYPES from '../../data/modal_types'

function Businesses() {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);
    const [exportToExcel, setExportToExcel] = useState(() => { })

    const dispatch = useDispatch();

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.ADD)
        }
        setOpen(!open)
    }

    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('export'), func: () => exportToExcel(), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
    ]


    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            <AGTable setExportToExcel={setExportToExcel} display={BACK_ROUTES.BUSINESS} action={openDialog} />
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.BUSINESS} type={dialogType} />
        </Box>
    )
}

export default Businesses

