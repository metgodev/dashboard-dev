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
// styles
import { useTheme } from "@material-ui/styles";

const states = {
    sent: "success",
    pending: "warning",
    declined: "secondary",
};

export default function PaginationTable({ data, page, setPage, rowsPerPage, setRowsPerPage }) {
    let keys = Object.keys(data[0]).map(i => i.toUpperCase());
    keys.shift(); // delete "id" key
    //style
    let theme = useTheme();

    const ChangePage = (e, newPage) => {
        setPage(newPage);
    };

    const ChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', direction: theme.direction === 'ltr' ? 'rtl' : 'ltr' }}>
            <TableContainer sx={{ maxHeight: '76vh' }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {keys.map(key => (
                                <TableCell key={key}>{key}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(({ id, name, email, product, price, date, city, status }) => (
                                <TableRow key={id}>
                                    <TableCell className="pl-3 fw-normal">{name}</TableCell>
                                    <TableCell>{email}</TableCell>
                                    <TableCell>{product}</TableCell>
                                    <TableCell>{price}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>{city}</TableCell>
                                    <TableCell>
                                        <Button
                                            color={states[status.toLowerCase()]}
                                            size="small"
                                            className="px-2"
                                            variant="contained"
                                        >
                                            {status}
                                        </Button>
                                    </TableCell>
                                </TableRow>
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
        </Paper>
    );
}