import React, { forwardRef, useState } from 'react';
import { Box } from '@mui/system';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import { useSelector } from 'react-redux';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContent, IconButton } from '@material-ui/core';
import DialogContentText from '@mui/material/DialogContentText';
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

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupDialog({ description, tabs, title, open, setOpen, type }) {
    //styles
    const classes = useStyles()
    const theme = useTheme();
    //global
    const { editTabData } = useSelector(s => s.mainReducer);

    const handleClose = () => setOpen(false);

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
                maxWidth={"lg"}
            >
                <DialogTitle className={classes.dialogHeader}>
                    {title}
                    <IconButton onClick={handleClose}>
                        < CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true} className={classes.dialogContent}>
                    {tabs === 'businesess' && <ModifyPop handleClose={handleClose} type={type} initialData={editTabData} />}
                    {tabs === 'events' && <EventsPop handleClose={handleClose} type={type} initialData={editTabData} />}
                    {tabs === 'points' && <PointsPop handleClose={handleClose} type={type} initialData={editTabData} />}
                    {tabs === 'tracks' && <TracksPop handleClose={handleClose} type={type} initialData={editTabData} />}
                    {/* authority management */}
                    {tabs === 'authority' && <AuthorityPop handleClose={handleClose} type={type} initialData={editTabData} />}
                    {tabs === 'tags' && <TagPop handleClose={handleClose} type={type} initialData={editTabData} />}
                </DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </Dialog>
        </Box >
    );
}