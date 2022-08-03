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

function Businesses() {
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [exportToExcel, setExportToExcel] = useState(() => { })
    const [selectedColumn, setSelectedColumn] = useState({})

    const dispatch = useDispatch();

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType('add')
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
            <AGTable setSelectedColumn={setSelectedColumn} selectedColumn={selectedColumn} setExportToExcel={setExportToExcel} display={'business'} action={openDialog} />
            <PopupDialog setSelectedColumn={setSelectedColumn} title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} type={dialogType} />
        </Box>
    )
}

export default Businesses

