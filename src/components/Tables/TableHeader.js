import React, { useState } from 'react'
import { Button } from '../Wrappers/Wrappers';
import { MenuItem, Select } from '@material-ui/core';
import { FormControl, InputAdornment, TableCell, TableRow, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// styles
import useStyles from "./styles";
import term from '../../terms';
import config from '../../config';


function TableHeader({ keys }) {
    let cat = config.tableCategories;
    let data = [...keys, 'btn']
    let classes = useStyles();
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
        <TableRow>
            {data.map((key) => (
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
                                    Search
                                </Button>
                        }
                    </FormControl>
                </TableCell>
            ))}
        </TableRow>
    )
}

export default TableHeader
