import React, { useState } from 'react'
import term from '../../terms';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useStyles from "./styles";
import { CircularProgress } from '@mui/material';

const stats = {
    'PRIVATE': "error",
    'PUBLIC': "success",
    'PENDING_APPROVAL': "warning"
};

const StatusMenu = (element) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (status) => {
        try {
            element.onUpdate({ data: { status, _id: element.data._id }, node: element.node })
            setAnchorEl(null);
        } catch (e) {
            console.log(e)
        }
    };
    return (
        element.data ?
            <div key={element.data._id} style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
                <Button
                    className={classes.statusBtns}
                    color={stats[element.value]}
                    size="small"
                    style={{ borderWidth: 2 }}
                    variant="outlined"
                    id="basic-button"
                    aria-controls="basic-menu"
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                    fullWidth
                >
                    {term(element.value.toLowerCase())}
                </Button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    <MenuItem onClick={() => handleClose('PRIVATE')}>{term('private')}</MenuItem>
                    <MenuItem onClick={() => handleClose('PUBLIC')}>{term('public')}</MenuItem>
                    <MenuItem onClick={() => handleClose('PENDING_APPROVAL')}>{term('pending_approval')}</MenuItem>
                </Menu>
            </div>
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <CircularProgress size={20} />
            </div>
    );
};


export default StatusMenu;