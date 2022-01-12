import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { ListItemIcon } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WhatsappOutlinedIcon from '@mui/icons-material/WhatsappOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';

const ITEM_HEIGHT = 48;

const iconTypes = (options) => {
    switch (options) {
        case 'whatsapp':
            return <WhatsappOutlinedIcon />
        case 'email':
            return <EmailOutlinedIcon />
        case 'phone':
            return <LocalPhoneOutlinedIcon />
        default:
            return;
    }
}

export default function TableInfoMenu({ options }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls="long-menu"
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} onClick={handleClose}>
                        <ListItemIcon>
                            {iconTypes(option)}
                        </ListItemIcon>
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
}