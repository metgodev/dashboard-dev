import React, { useState } from 'react'
import term from '../../terms';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useStyles from "./styles";
import { CircularProgress, TextField } from '@mui/material';
import ENTITY_STATUS from '../../data/entity_status';
import GetPermissions from '../../hooks/GetPermissions';
import { useSelector } from 'react-redux';

const stats = {
    'PRIVATE': "error",
    'PUBLIC': "success",
    'PENDING_APPROVAL': "warning"
};
const statsColors = {
    'PRIVATE': '#e53e3e',
    'PUBLIC': '#11cb5f',
    'PENDING_APPROVAL': 'orange'
};

const StatusMenu = (element) => {

    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions(userDetails)

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    let classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = async (status) => {
        if (status === null) {
            setAnchorEl(null);
        } else {
            element.onUpdate({ data: { status, _id: element.data._id }, setStatus: element.setValue })
            setAnchorEl(null);
        }
    };

    return (
        element.data ?
            <div key={element.data._id} style={{ display: 'flex', flex: 1, width: '100%', height: '100%' }}>
                {permissions.status_change ?
                    <>
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
                            onClose={() => handleClose(null)}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleClose(ENTITY_STATUS.PRIVATE)}>{term('private')}</MenuItem>
                            <MenuItem onClick={() => handleClose(ENTITY_STATUS.PUBLIC)}>{term('public')}</MenuItem>
                            <MenuItem onClick={() => handleClose(ENTITY_STATUS.PENDING_APPROVAL)}>{term('pending_approval')}</MenuItem>
                        </Menu>
                    </>
                    :
                    <p style={{ color: statsColors[element.value] }} className={classes.statusBtns}>{term(element.value.toLowerCase())}</p>
                }
            </div >
            :
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                <CircularProgress size={20} />
            </div>
    );
};


export default StatusMenu;