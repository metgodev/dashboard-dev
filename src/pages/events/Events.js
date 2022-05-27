import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AGTable from '../../components/Tables/AGTable'

function Events() {
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const dispatch = useDispatch();

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data([]))
            setDialogType('add')
        }
        setOpen(!open)
    }

    let headerBtns = [
        //can get name, func, input, icon 
        { name: term('export'), func: () => { }, buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
        { name: 'forword', func: () => () => { }, icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => () => { }, icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('events')} />
            <AGTable display={'events'} action={openDialog} />
            <PopupDialog title={term('events')} open={open} setOpen={setOpen} tabs={'events'} type={dialogType} />
        </Box>
    )
}

export default Events
