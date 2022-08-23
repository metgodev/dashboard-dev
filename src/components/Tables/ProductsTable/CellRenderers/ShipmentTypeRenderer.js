import { Button, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import term from '../../../../terms'
import { updateEnumValue } from '../ProductsTableHelpers';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function ShipmentTypeRenderer(params) {

    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleChange = (change) => {
        updateEnumValue(params.data._id, 'shipmentType', change, params)
        setAnchorEl(null)
    }

    return (
        <>
            <Button
                variant={'outlined'}
                onClick={(e) => setAnchorEl(e.currentTarget)}
            >
                {term(params.value.toLowerCase())}
                <KeyboardArrowDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={() => handleChange('DROPOFF')}>{term('dropoff')}</MenuItem>
                <MenuItem onClick={() => handleChange('PAYED_SHIPPING')}>{term('payed_shipping')}</MenuItem>
                <MenuItem onClick={() => handleChange('PICKUP')}>{term('pickup')}</MenuItem>
                <MenuItem onClick={() => handleChange('FREE_SHIPPING')}>{term('free_shipping')}</MenuItem>
            </Menu>
        </>
    )
}

export default ShipmentTypeRenderer