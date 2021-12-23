import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import BusinessesPop from './PopupConfig/BusinessesPop';
//style
import { useTheme } from "@material-ui/styles";



const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function PopupDialog({ description, btns, tabs, title, open, setOpen }) {
    const theme = useTheme();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <Dialog
                PaperProps={{ style: { backgroundColor: theme.palette.bg.light } }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth="md"
            >
                <DialogTitle>{title}</DialogTitle>
                {tabs === 'businesess' && <BusinessesPop />}
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