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

function PointsOfInterest() {
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
        //can get name, func, input, icon 
        { name: term('export'), func: () => exportToExcel(), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('points')} />
            <AGTable setSelectedColumn={setSelectedColumn} selectedColumn={selectedColumn} setExportToExcel={setExportToExcel} display={'pois'} action={openDialog} />
            <PopupDialog setSelectedColumn={setSelectedColumn} title={term('points')} open={open} setOpen={setOpen} tabs={'points'} type={dialogType} />
        </Box>
    )
}

export default PointsOfInterest
