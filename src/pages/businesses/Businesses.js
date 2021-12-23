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
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const pages = Math.ceil(config.businesses_table.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer)

    let headerBtns = [
        //can get name, func, input, icon 
        { name: term('export'), func: () => ExportToExcel(config.businesses_table, 'test') },
        { name: term('import'), func: ReadFromExcel, input: true, },
        { name: term('', 'הוספה'), func: () => setOpen(true) },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            <PaginationTable
                lang={lang}
                data={config.businesses_table}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} />
        </Box>
    )
}

export default Businesses

