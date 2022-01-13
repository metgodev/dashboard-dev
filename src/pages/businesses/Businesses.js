import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import TableService from '../../hooks/DataService/TableService'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { CircularProgress } from '@material-ui/core'

function Businesses() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { businesses, tableCategories, keys } = TableService(rowsPerPage, page)
    const pages = Math.ceil(businesses.length / rowsPerPage - 1)
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
        { name: term('export'), func: () => ExportToExcel(businesses, 'test') },
        { name: term('import'), func: ReadFromExcel, input: true, },
        { name: term('add'), func: openDialog },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            {businesses.length ? <PaginationTable
                lang={lang}
                page={page}
                keys={keys}
                setPage={setPage}
                data={businesses}
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
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} initialData={initialDataDialog} type={dialogType} />
        </Box>
    )
}

export default Businesses

