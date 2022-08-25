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
import { useDispatch } from 'react-redux';
import { set_edit_tab_data } from '../../REDUX/actions/main.actions';
import toast from 'react-hot-toast';
import MODAL_TYPES from '../../data/modal_types';
import { clearButtonId } from './config';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function PopupDialog({ tabs, title, open, setOpen, type, maxWidth }) {
    //styles
    const classes = useStyles()
    const theme = useTheme();
    const dispatch = useDispatch();

    const handleClose = () => {
        toast.dismiss()
        let clearButton = document.querySelector(clearButtonId);
        if (clearButton) clearButton.click();
        setOpen(false);
        dispatch(set_edit_tab_data({}))
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
                maxWidth={maxWidth || "xl"}
            >
                <DialogTitle className={classes.dialogHeader}>
                    {title}
                    <IconButton onClick={handleClose}>
                        < CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true} className={classes.dialogContent}>
                    {tabs === MODAL_TYPES.BUSINESS && <ModifyPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === MODAL_TYPES.EVENTS && <EventsPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === MODAL_TYPES.POINTS && <PointsPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === MODAL_TYPES.TRACKS && <TracksPop open={open} handleClose={handleClose} type={type} />}
                    {/* authority management */}
                    {tabs === MODAL_TYPES.AUTHORITY && <AuthorityPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === MODAL_TYPES.TAGS && <TagPop open={open} handleClose={handleClose} type={type} />}
                    {tabs === MODAL_TYPES.TAGS_LINK && <TagLinkPop open={open} handleClose={handleClose} type={type} />}
                </DialogContent>
            </Dialog>
        </Box >
    );
}