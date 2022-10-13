import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AGTable from '../../components/Tables/AGTable'
import MODAL_STATES from '../../data/modal_states'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_TYPES from '../../data/modal_types'
import MobileTable from '../../components/MobileTable/MobileTable'
import getWindowSize from '../../hooks/useGetWindowSize'
import { MOBILE_WIDTH } from '../../data/constants'

function Events() {
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);
    const [exportToExcel, setExportToExcel] = useState(() => { })

    const dispatch = useDispatch();
    const { width } = getWindowSize();

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
        //can get name, func, input, icon 
        { name: term('export'), func: () => exportToExcel(), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('events')} />
            {width > MOBILE_WIDTH && <AGTable setExportToExcel={setExportToExcel} display={BACK_ROUTES.EVENTS} action={openDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.EVENTS} action={openDialog} />}
            <PopupDialog title={term('events')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.EVENTS} type={dialogType} />
        </Box>
    )
}

export default Events
