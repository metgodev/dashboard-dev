import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import { Grid, IconButton } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
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

export default function PaginationTable({ data, keys, page, setPage, rowsPerPage, setRowsPerPage, lang, openDialog, cat, remove, tableType, linking }) {
    let PaginationLanguage = languages.find(l => Object.keys(l).shift() === lang)[lang]
    //local
    const [TableCel] = useState({
        columns: keys,
        columnsToHide: ['btn', 'actions', 'status'],
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
        <Widget disableWidgetMenu >
            <ThemeProvider theme={createTheme(theme, PaginationLanguage)}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader aria-label="sticky table"  >
                        <TableHeader keys={keys} cat={cat} />
                        <TableBody >
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({ ...data }) => (
                                    <StyledTableRow key={data.id}>
                                        {data?.status && <TableCell size="small" align='center' >
                                            <TableMenuBtn status={data.status} stats={stats} id={data.id} tableType={tableType} />
                                        </TableCell>}
                                        {addTableRow(data, TableCel.columns, TableCel.columnsToHide)}
                                        <Grid container direction="row" justifyContent={data.contact || remove ? "space-evenly" : "center"} alignItems="stretch">
                                            {data.contact && <TableInfoMenu options={JSON.parse(data.contact)} />}
                                            {remove && <IconButton size="small" aria-haspopup="true" onClick={() => remove(data.id)} >
                                                <DeleteOutlinedIcon />
                                            </IconButton>}
                                            {linking && <IconButton size="small" aria-haspopup="true" onClick={() => linking(data)} >
                                                <InsertLinkOutlinedIcon />
                                            </IconButton>}
                                            {openDialog && <IconButton size="small" aria-haspopup="true" onClick={() => openDialog(data)} >
                                                <EditOutlinedIcon />
                                            </IconButton>}
                                        </Grid>
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