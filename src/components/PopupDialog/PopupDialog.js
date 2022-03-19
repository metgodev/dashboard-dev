import React, { forwardRef, useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Box } from '@mui/system';
import { DialogContent, IconButton } from '@material-ui/core';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import OpenInFullOutlinedIcon from '@mui/icons-material/OpenInFullOutlined';
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


export default function PopupDialog({description, tabs, title, open, setOpen, type }) {

    const [expend, setExpend] = useState("md")
    const classes = useStyles()
    const theme = useTheme();
    // const [media, setMedia] = useState([])

    // const setInitialValuesForMedia = () => {
    //     if (initialData?.gallery !== undefined) {
    //         let initImagesArr = []
    //         JSON.parse(initialData.gallery).map((mediaItem) => {
    //             initImagesArr.push(mediaItem)
    //         })
    //         setMedia(initImagesArr)
    //     }
    // }

    // useEffect(() => {
    //     setInitialValuesForMedia()
    // }, [open, initialData])

    const handleClose = () => {
        setOpen(false)
    }

    const handleWidth = () => {
        if (expend === "sm") setExpend("md")
        else if (expend === "md") setExpend("lg")
        else if (expend === "lg") setExpend("sm")
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
                maxWidth={expend}
            >
                <DialogTitle className={classes.dialogHeader}>
                    <IconButton onClick={handleWidth}>
                        < OpenInFullOutlinedIcon />
                    </IconButton>
                    {title}
                    <IconButton onClick={handleClose}>
                        < CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers={true} className={classes.dialogContent}>
                    {tabs === 'businesess' && <ModifyPop handleClose={handleClose} type={type}  />}
                    {tabs === 'events' && <EventsPop handleClose={handleClose} type={type} />}
                    {tabs === 'points' && <PointsPop handleClose={handleClose} type={type}  />}
                    {tabs === 'tracks' && <TracksPop handleClose={handleClose} type={type} />}
                    {/* authority management */}
                    {/* {tabs === 'authority' && <AuthorityPop handleClose={handleClose} initialData={initialData} type={type} />}
                    {tabs === 'tags' && <TagPop handleClose={handleClose} initialData={initialData} type={type} />} */}
                </DialogContent>
                <DialogContentText>
                    {description}
                </DialogContentText>
            </Dialog>
        </Box >
    );
}