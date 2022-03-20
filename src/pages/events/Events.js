import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import PaginationTable from '../../components/Tables/PaginationTable'
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { CircularProgress } from '@material-ui/core'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import EventstableService from '../../hooks/DataService/EventstableService'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

function Events() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { events, tableCategories, keys } = EventstableService(rowsPerPage, page)
    const pages = Math.ceil(events.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');    //global 
    const { lang } = useSelector(s => s.mainRememberReducer)
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
        { name: term('export'), func: () => ExportToExcel(events, 'events_list'), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: ReadFromExcel, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('events')} />
            {events.length ? <PaginationTable
                tableType={'events'}
                lang={lang}
                page={page}
                keys={keys}
                setPage={setPage}
                data={events}
                cat={tableCategories}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                openDialog={openDialog}
            /> :
                <Box style={{
                    position: "fixed",
                    top: '52%',
                    left: '48%',
                    transform: 'translate(-50% , -50%)',
                }}>
                    <CircularProgress size={60} />
                </Box>
            }
            <PopupDialog title={term('events')} open={open} setOpen={setOpen} tabs={'events'} type={dialogType} />
        </Box>
    )
}

export default Events
