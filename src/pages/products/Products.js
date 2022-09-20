import React, { useState } from 'react'
import AGTable from '../../components/Tables/AGTable'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import term from '../../terms'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_TYPES from '../../data/modal_types'
import { Box } from '@mui/material';
import { set_edit_tab_data } from '../../REDUX/actions/main.actions';
import { useDispatch } from 'react-redux';
import MODAL_STATES from '../../data/modal_states';
import getWindowSize from '../../hooks/useGetWindowSize'
import MobileTable from '../../components/MobileTable/MobileTable';
import { MOBILE_WIDTH } from '../../data/constants'

function Products() {

    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);
    const [exportToExcel, setExportToExcel] = useState(() => { })

    const dispatch = useDispatch();
    const { width, height } = getWindowSize();

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
        { name: term('export'), func: () => exportToExcel(), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('products')} />
            {width > MOBILE_WIDTH && <AGTable setExportToExcel={setExportToExcel} display={BACK_ROUTES.PRODUCTS} action={openDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.PRODUCTS} action={openDialog} />}
            <PopupDialog title={term('products')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.PRODUCTS} type={dialogType} />
        </Box>
    )
}

export default Products