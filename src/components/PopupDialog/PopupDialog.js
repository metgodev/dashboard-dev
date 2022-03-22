import React, { forwardRef } from 'react';
import { Box } from '@mui/system';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ModifyPop from './PopupConfig/Businesses/ModifyPop';
import EventsPop from './PopupConfig/Events/EventsPop';
import PointsPop from './PopupConfig/Points/PointsPop';
import TracksPop from './PopupConfig/Tracks/TracksPop';
import AuthorityPop from './PopupConfig/AuthorityManagement/AuthorityPop';
import TagPop from './PopupConfig/TagsManagment/TagPop';
//style
import { useTheme } from "@material-ui/styles";
import useStyles from "./styles";

export const clearButtonId = '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupDialog({ tabs, title, open, setOpen, type, maxWidth }) {
    //styles
    const classes = useStyles()
    const theme = useTheme();

    const handleClose = () => {
        let clearButton = document.querySelector(clearButtonId);
        if (clearButton) clearButton.click();
        setOpen(false);
    }

    return (
        <Box>
            <Dialog
                PaperProps={{
                    style: { backgroundColor: theme.palette.bg.light, height: '100%' }
                }}
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
                fullWidth
                maxWidth={maxWidth || "lg"}
            >
                <DialogTitle className={classes.dialogHeader}>
                    {title}
                    <IconButton onClick={handleClose}>
                        < CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true} className={classes.dialogContent}>
                    {tabs === 'businesess' && <ModifyPop handleClose={handleClose} type={type} />}
                    {tabs === 'events' && <EventsPop handleClose={handleClose} type={type} />}
                    {tabs === 'points' && <PointsPop handleClose={handleClose} type={type} />}
                    {tabs === 'tracks' && <TracksPop handleClose={handleClose} type={type} />}
                    {/* authority management */}
                    {tabs === 'authority' && <AuthorityPop handleClose={handleClose} type={type} />}
                    {tabs === 'tags' && <TagPop handleClose={handleClose} type={type} />}
                </DialogContent>
            </Dialog>
        </Box >
    );
}