import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// styles
import useStyles from "./styles";
import { useTheme } from "@material-ui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';
//healpers
import { StyledTableRow, languages, stats, addTableRow } from './TableRowHealpers';
import Widget from '../Widget/Widget';
import TableHeader from './TableHeader';
import TableMenuBtn from './TableMenuBtn';
import TableInfoMenu from './TableInfoMenu';

export default function PaginationTable({ data, page, setPage, rowsPerPage, setRowsPerPage, lang, openDialog }) {
    let keys = Object.keys(data[0]).map(i => i);
    keys.shift() // delete "id" key,
    let PaginationLanguage = languages.find(l => Object.keys(l).shift() === lang)[lang]
    //local
    const [TableCel, setTable] = useState({
        columns: keys,
        columnsToHide: ['id', 'status', 'contact'],
    })
    //style
    let classes = useStyles();
    let theme = useTheme();

    const ChangePage = (e, newPage) => setPage(newPage);

    const ChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    return (
        <Widget disableWidgetMenu>
            <ThemeProvider theme={createTheme(theme, PaginationLanguage)}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader aria-label="sticky table"  >
                        <TableHeader keys={keys} />
                        <TableBody >
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({ id, status, ...data }) => (
                                    <StyledTableRow key={id}>
                                        {status && <TableCell size="small" align='center' >
                                            <TableMenuBtn status={status} stats={stats} />
                                        </TableCell>}
                                        {addTableRow(data, TableCel.columns, TableCel.columnsToHide)}
                                        <TableCell size="small" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <TableInfoMenu options={data.contact} />
                                            {openDialog && <IconButton size="small" aria-haspopup="true" onClick={() => openDialog(data)} >
                                                <ArrowBackIosIcon />
                                            </IconButton>}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={ChangePage}
                    onRowsPerPageChange={ChangeRowsPerPage}
                />
            </ThemeProvider>
        </Widget >
    );
}