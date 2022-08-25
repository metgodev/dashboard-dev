import React from 'react'
import { MenuItem } from '@mui/material'
import { Select } from 'mui-rff'
import term from '../../../terms'

function Picker({ title, field, options }) {
    return (
        <Select label={title} name={field} required={true}>
            {options && options[field].map((item) => (
                <MenuItem key={item.value} value={item.value}>{term(item.name)}</MenuItem>
            ))}
        </Select>
    )
}

export default Picker