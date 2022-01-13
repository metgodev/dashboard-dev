import React, { useState } from 'react'
import { Button } from '../Wrappers/Wrappers';
import { MenuItem, Select } from '@material-ui/core';
import { FormControl, InputAdornment, TableCell, TableRow, TextField, TableHead } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import term from '../../terms';

function TableHeader({ keys, cat }) {

    const [values, setValues] = useState({
        status: '',
        name: '',
        impact: '',
        category: '',
        tag: '',
        authority: '',
        address: '',
        edit: ''
    })

    const handleChange = (e, key) => {
        setValues(prevState => ({ ...prevState, [key]: e.target.value }));
    };

    return (
        <TableHead >
            <TableRow>
                {keys.map((key) => (
                    <TableCell size="small" align='center' key={key}>
                        <FormControl fullWidth style={{ minWidth: 130 }}>
                            {
                                key !== 'btn' ? ['name', 'address'].indexOf(key) > -1 ?
                                    <>
                                        {term(key)}
                                        <TextField
                                            onChange={(e) => handleChange(e, key)}
                                            size="small"
                                            id="outlined-required"
                                            defaultValue=""
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SearchIcon />
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </>
                                    :
                                    <>
                                        {term(key)}
                                        <Select variant="outlined" value={values[key]} displayEmpty onChange={(e) => handleChange(e, key)}>
                                            {cat[key] && cat[key].map(c => <MenuItem key={c} disablescrolllock={true.toString()} value={c}>{term(c)}</MenuItem>)}
                                        </Select>
                                    </>
                                    :
                                    <Button
                                        style={{ marginTop: 20 }}
                                        color="primary"
                                        onClick={() => { console.log(values) }}>
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
