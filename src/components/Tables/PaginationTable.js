import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Button } from '../Wrappers/Wrappers';
import { Paper } from '@mui/material';
import term from '../../terms';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// styles
import useStyles from "./styles";
import { useTheme } from "@material-ui/styles";
//healpers
import { StyledTableRow, languages, states } from './TableRowHealpers';



export default function PaginationTable({ data, page, setPage, rowsPerPage, setRowsPerPage, lang }) {
    let keys = Object.keys(data[0]).map(i => i);
    keys.shift(); // delete "id" key
    let PaginationLanguage = languages.find(l => Object.keys(l).shift() === lang)[lang]
    //style
    let theme = useTheme();
    let classes = useStyles();

    const ChangePage = (e, newPage) => setPage(newPage);

    const ChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };


    return (
        <Paper className={classes.paper}>
            <ThemeProvider theme={createTheme(theme, PaginationLanguage)}>
                <TableContainer className={classes.tableContainer}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {keys.map(key => (
                                    <TableCell size="small" align='center' key={key}>{term(key).toUpperCase()}</TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(({ id, status, name, impact, category, tag, authority, address, edit }) => (
                                    <StyledTableRow key={id}>
                                        <TableCell size="small" align='center'>
                                            <Button
                                                color={states[status.toLowerCase()]}
                                                size="small"
                                                className={classes.statusBtns}
                                                variant="contained"
                                            >
                                                {status}
                                            </Button>
                                        </TableCell>
                                        <TableCell size="small" align='center' className="pl-3 fw-normal">{name}</TableCell>
                                        <TableCell size="small" align='center'>{impact}</TableCell>
                                        <TableCell size="small" align='center'>{category}</TableCell>
                                        <TableCell size="small" align='center'>{tag}</TableCell>
                                        <TableCell size="small" align='center'>{authority}</TableCell>
                                        <TableCell size="small" align='center'>{address}</TableCell>
                                        <TableCell size="small" align='center'>{edit}</TableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={ChangePage}
                    onRowsPerPageChange={ChangeRowsPerPage}
                />
            </ThemeProvider>
        </Paper>
    );
}