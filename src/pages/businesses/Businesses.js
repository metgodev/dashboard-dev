import React, { useState } from 'react'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import config from '../../config'
import term from '../../terms'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'

function Businesses() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const pages = Math.ceil(config.table.length / rowsPerPage - 1)


    let headerBtns = [
        { name: term('', 'יצוא מקובץ .xslx'), func: () => ExportToExcel(config.table, 'test') },
        { name: term('', 'יבוא מקובץ .xslx'), func: ReadFromExcel, input: true, },
        { name: term('', 'הוספה'), func: () => console.log('Popup') },
        { name: term('', '<'), func: () => setPage((page < pages) ? (page + 1) : page) },
        { name: term('', '>'), func: () => setPage((page >= pages) ? (page - 1) : page) },
    ]



    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            <PaginationTable
                data={config.table}
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
            />
        </Box>
    )
}

export default Businesses


