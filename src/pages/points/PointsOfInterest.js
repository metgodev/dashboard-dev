import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import PageTitle from '../../components/PageTitle/PageTitle'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { useDispatch } from 'react-redux'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import term from '../../terms'
import AGTable from '../../components/Tables/AGTable'
import MODAL_STATES from '../../data/modal_states';
import MODAL_TYPES from '../../data/modal_types';
import BACK_ROUTES from '../../data/back_routes';
import getWindowSize from '../../hooks/useGetWindowSize'
import MobileTable from '../../components/MobileTable/MobileTable';
import { MOBILE_WIDTH } from '../../data/constants'

function PointsOfInterest() {

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
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('points')} />
            {width > MOBILE_WIDTH && <AGTable setExportToExcel={setExportToExcel} display={BACK_ROUTES.POINTS} action={openDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.POINTS} action={openDialog} />}
            <PopupDialog title={term('points')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.POINTS} type={dialogType} />
        </Box>
    )
}

export default PointsOfInterest
