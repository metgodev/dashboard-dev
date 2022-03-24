import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import term from '../../terms';
import { client } from '../../API/metro';
import { useDispatch } from 'react-redux';
// styles
import useStyles from "./styles";
import { set_table_changed } from '../../REDUX/actions/main.actions';

export default function TableMenuBtn({ status, stats, id, tableType }) {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let classes = useStyles();
    let sts = status.toLowerCase()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (element) => {
        client.service(tableType).patch(id, { "status": element }).then(() => {
            dispatch(set_table_changed(element))
        })
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                color={stats[term(sts)]}
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
            >{term(sts)}
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
                <MenuItem onClick={() => handleClose('PRIVATE')}>{term('private')}</MenuItem>
                <MenuItem onClick={() => handleClose('PUBLIC')}>{term('public')}</MenuItem>
                <MenuItem onClick={() => handleClose('PENDING_APPROVAL')}>{term('pending_approval')}</MenuItem>
            </Menu>
        </div>
    );
}