import React, { useState } from 'react'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import config from '../../config'
import term from '../../terms'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import { useSelector } from 'react-redux'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PopupDialog from '../../components/PopupDialog/PopupDialog'

function Businesses() {
    let tableData = config.businesses_table;
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const pages = Math.ceil(tableData.length / rowsPerPage - 1)
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
        { name: term('export'), func: () => ExportToExcel(tableData, 'test') },
        { name: term('import'), func: ReadFromExcel, input: true, },
        { name: term('add'), func: openDialog },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            <PaginationTable
                lang={lang}
                data={tableData}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                openDialog={openDialog}
            />
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} initialData={initialDataDialog} type={dialogType} />
        </Box>
    )
}

export default Businesses

