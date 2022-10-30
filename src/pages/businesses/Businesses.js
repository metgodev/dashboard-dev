import React, { useState } from 'react'
import term from '../../terms'
import { Box, IconButton, Modal } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
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
import getWindowSize from '../../hooks/useGetWindowSize'
import MobileTable from '../../components/MobileTable/MobileTable'
import { MOBILE_WIDTH } from '../../data/constants'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useEffect } from 'react'

function Businesses() {

    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);
    const [exportToExcel, setExportToExcel] = useState(() => { })
    const [openFirstBusinessModal, setOpenFirstBusinessModal] = useState(false)
    const userDetails = useSelector(s => s.userReducer.userDetails)

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

    useEffect(() => {
        if (userDetails.roles.length === 1) {
            setOpenFirstBusinessModal(true)
        }
    }, [])

    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('export'), func: () => exportToExcel(), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
    ]

    const handleClose = () => {
        setOpenFirstBusinessModal(false)
    }

    return (
        <Box>
            <Modal
                open={openFirstBusinessModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: width > 1280 ? '40vw' : '95vw', height: width > 600 ? '70%' : '90%', backgroundColor: 'white' }}>
                        <IconButton onClick={handleClose} style={{ position: 'absolute', top: 10, left: 10 }}>
                            < CloseOutlinedIcon />
                        </IconButton>
                        <p style={{ fontWeight: 'bold', fontSize: '25px' }}>{term('welcome')}</p>
                        <Box style={{ width: '100%', height: '100%', padding: '5px', display: 'flex', justifyContent: "center", alignItems: 'center', }}>
                            <p>{term('first_time_business_owner')}</p>
                        </Box>
                    </div>
                </Box >
            </Modal>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            {width > MOBILE_WIDTH && <AGTable setExportToExcel={setExportToExcel} display={BACK_ROUTES.BUSINESS} action={openDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.BUSINESS} action={openDialog} />}
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={MODAL_TYPES.BUSINESS} type={dialogType} />
        </Box>
    )
}

export default Businesses

