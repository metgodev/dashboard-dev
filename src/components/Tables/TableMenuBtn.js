import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import term from '../../terms';
// styles
import useStyles from "./styles";

export default function TableMenuBtn({ status, stats }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color={stats[status.toLowerCase()]}
                size="small"
                style={{ borderWidth: 2 }}
                className={classes.statusBtns}
                variant="outlined"
                id="basic-button"
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                fullWidth
            >{status}
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>{term('private')}</MenuItem>
                <MenuItem onClick={handleClose}>{term('public')}</MenuItem>
                <MenuItem onClick={handleClose}>{term('pending')}</MenuItem>
            </Menu>
        </div>
    );
}