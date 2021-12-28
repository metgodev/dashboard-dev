import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import PaginationTable from '../../components/Tables/PaginationTable'
import config from '../../config';
import term from '../../terms'

function Events() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    const pages = Math.ceil(config.events_table.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer)

    let headerBtns = [
        //can get name, func, input, icon 
        { name: term('export'), func: () => ExportToExcel(config.events_table, 'test') },
        { name: term('import'), func: ReadFromExcel, input: true, },
        { name: term('add'), func: () => setOpen(true) },
        { name: 'forword', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]

    return (
        <div>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('events')} />
            <PaginationTable
                lang={lang}
                data={config.events_table}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </div>
    )
}

export default Events
