import React, { useState } from 'react'
import { Box } from '@material-ui/core'
import PageTitle from '../../components/PageTitle/PageTitle'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
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
        { name: term('export'), func: () => { }, buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: () => { }, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
        { name: 'forword', func: () => () => { }, icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => () => { }, icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('points')} />
            <AGTable display={'pois'} action={openDialog} />
            <PopupDialog title={term('points')} open={open} setOpen={setOpen} tabs={'points'} type={dialogType} />
        </Box>
    )
}

export default PointsOfInterest
