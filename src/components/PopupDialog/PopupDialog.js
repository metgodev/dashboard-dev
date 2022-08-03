import React, { forwardRef } from 'react';
import { Box } from '@mui/system';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ModifyPop from '../PopupDialogSections/Businesses/ModifyPop';
import EventsPop from '../PopupDialogSections/Events/EventsPop';
import PointsPop from '../PopupDialogSections/Points/PointsPop';
import TracksPop from '../PopupDialogSections/Tracks/TracksPop';
import AuthorityPop from '../PopupDialogSections/AuthorityManagement/AuthorityPop';
import TagPop from '../PopupDialogSections/TagsManagment/TagPop';
import TagLinkPop from '../PopupDialogSections/TagsManagment/TagLinkPop';
//style
import { useTheme } from "@material-ui/styles";
import useStyles from "./styles";

export const clearButtonId = '.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-sizeMedium.MuiAutocomplete-clearIndicator.css-1glvl0p-MuiButtonBase-root-MuiIconButton-root-MuiAutocomplete-clearIndicator'

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupDialog({ tabs, title, open, setOpen, type, maxWidth, setSelectedColumn }) {
    //styles
    const classes = useStyles()
    const theme = useTheme();

    const handleClose = () => {
        let clearButton = document.querySelector(clearButtonId);
        if (clearButton) clearButton.click();
        setOpen(false);
        setSelectedColumn({})
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
                    {tabs === 'businesess' && <ModifyPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === 'events' && <EventsPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === 'points' && <PointsPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === 'tracks' && <TracksPop open={open} handleClose={handleClose} type={type} />}
                    {/* authority management */}
                    {tabs === 'authority' && <AuthorityPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === 'tags' && <TagPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === 'tags_link' && <TagLinkPop open={open} handleClose={handleClose} type={type} />}
                </DialogContent>
            </Dialog>
        </Box >
    );
}