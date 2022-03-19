import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TracksTab } from './Tabs/TracksTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';

//styles
import useStyles from "../../styles";

const TracksPop = ({handleClose, type, open }) => {
    
    const classes = useStyles()
    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    const { editTabData } = useSelector(s => s.mainReducer)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            {loadingImage && <div style={{display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", backgroundColor:"rgba(0,0,0,0.5)", top:"0", left:"0", right:"0", bottom:"0", zIndex:"5"}}>
                <CircularProgress size={100}/>
            </div>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <TracksTab handleClose={handleClose} initialData={editTabData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab open={open} setLoadingImage={setLoadingImage} type={type} tab={"tracks"}/>
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default TracksPop;
