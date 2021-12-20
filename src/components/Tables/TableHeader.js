import React, { useState } from 'react'
import { Button } from '../Wrappers/Wrappers';
import { MenuItem, Select } from '@material-ui/core';
import { FormControl, TableCell, TableRow } from '@mui/material';
// styles
import useStyles from "./styles";
import term from '../../terms';
import config from '../../config';

const Items = (cat) => cat !== undefined && cat.map(c => <MenuItem disableScrollLock={true} value="none">{c}</MenuItem>)

function TableHeader({ keys }) {
    let cat = config.tableCategories;
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
    let data = [...keys, 'btn']

    const handleChange = (e, key) => {
        setValues(prevState => ({ ...prevState, [key]: e.target.value }));
    };

    return (
        <TableRow>
            {data.map((key) => (
                <TableCell size="small" align='center' key={key}>
                    <FormControl fullWidth>
                        {
                            key !== 'btn' ?
                                <>
                                    {term(key)}
                                    <Select variant="outlined" value={values[key]} displayEmpty onChange={(e) => handleChange(e, key)}>
                                        {cat[key] && cat[key].map(c => <MenuItem disableScrollLock={true} value={c}>{term(c)}</MenuItem>)}
                                    </Select>
                                </>
                                :
                                <Button
                                    style={{ marginTop: 20 }}
                                    color="primary"
                                    onChange={() => { }}>
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
