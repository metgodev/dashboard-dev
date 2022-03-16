import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Box } from '@material-ui/core'
import TracksTableService from '../../hooks/DataService/TracksTableService'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import PaginationTable from '../../components/Tables/PaginationTable'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { CircularProgress } from '@mui/material'
import term from '../../terms'

function Tracks() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { tracks, tableCategories, keys } = TracksTableService(rowsPerPage, page)
    const pages = Math.ceil(tracks.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [initialDataDialog, setInitialDataDialog] = useState([]);
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer)

    const openDialog = (data) => {
        if (!data) setDialogType('add')
        else {
            setDialogType('edit')
            setInitialDataDialog(data)
        }
        setOpen(!open)
    }

    let headerBtns = [
        //can get name, func, input, icon 
        { name: term('export'), func: () => ExportToExcel(tracks, 'tracks_list'), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: ReadFromExcel, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]


    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('routes')} />
            {tracks.length ? <PaginationTable
                lang={lang}
                page={page}
                keys={keys}
                setPage={setPage}
                data={tracks}
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
            <PopupDialog title={term('routes')} open={open} setOpen={setOpen} tabs={'tracks'} initialData={initialDataDialog} type={dialogType} />
        </Box>
    )
}

export default Tracks
