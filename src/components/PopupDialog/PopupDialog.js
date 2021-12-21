import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import BusinesPop from './PopupConfig/BusinesPop';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopupDialog({ description, btns, tabs, title, open, setOpen }) {

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{title}</DialogTitle>
                {tabs === 'businesess' && <BusinesPop />}
                <DialogContentText>
                    {description}
                </DialogContentText>
                <DialogActions>
                    {btns && btns.map(b => (<Button onClick={b.func()}>{b.name}</Button>))}
                </DialogActions>
            </Dialog>
        </Box >
    );
}