import React, { useState, useEffect } from 'react'
import { Button } from '../Wrappers/Wrappers';
import { MenuItem, Select } from '@material-ui/core';
import { FormControl, InputAdornment, TableCell, TableRow, TextField, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import term from '../../terms';
import { useDispatch } from 'react-redux';
import { set_filter_table } from '../../REDUX/actions/main.actions';
import { camelToSnakeCase } from '../../utils/camelToSnakeCase';

function TableHeader({ keys, cat }) {
    const [values, setValues] = useState({})
    //global
    let dispatch = useDispatch();

    const handleChange = (e, key) => {
        setValues(prevState => ({ ...prevState, [key]: e.target.value }));
    };

    const filterTable = (val) => {
        dispatch(set_filter_table(val))
    }

    return (
        <TableHead >
            <TableRow >
                {keys.map((key) => (
                    <TableCell size="small" align='center' key={key}>
                        <FormControl fullWidth style={{ minWidth: 130 }}>
                            {
                                key !== 'btn' ? ['name', 'address'].indexOf(key) > -1 && cat ?
                                    <>
                                        {term(key)}
                                        <TextField
                                            onChange={(e) => handleChange(e, key)}
                                            size="small"
                                            id="outlined-required"
                                            defaultValue=""
                                            inputprops={{
                                                startadornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </>
                                    : cat ?
                                        <>
                                            {term(camelToSnakeCase(key))}
                                            <Select variant="outlined" value={values[key]} displayEmpty onChange={(e) => handleChange(e, key)}>
                                                {cat[key] && cat[key].map(c => <MenuItem key={c} disablescrolllock={true.toString()} value={c}>{term(c)}</MenuItem>)}
                                            </Select>
                                        </>
                                        :
                                        <>
                                            {term(camelToSnakeCase(key))}
                                        </>
                                    :
                                    <Button
                                        color="primary"
                                        style={{ marginTop: 20 }}
                                        onClick={() => filterTable(values)}>
                                        {term('search')}
                                    </Button>
                            }
                        </FormControl>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}

export default TableHeader
