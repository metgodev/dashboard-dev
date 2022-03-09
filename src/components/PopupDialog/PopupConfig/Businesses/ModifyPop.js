import React, { useState, useEffect } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import LoadingSpin from "react-loading-spin";
//styles
import useStyles from "../../styles";



const ModifyPop = ({ media, setMedia, handleClose, initialData, type, imagesArr, setImagesArr, videoArr, setVideoArr, logo, setLogo, files, setFiles }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            {loadingImage && <div style={{display:"flex", alignItems:"center", justifyContent:"center", position:"absolute", backgroundColor:"rgba(0,0,0,0.5)", top:"0", left:"0", right:"0", bottom:"0", zIndex:"5"}}>
                <LoadingSpin />
            </div>}
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <ModifyTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <UploadMediaTab setLoadingImage={setLoadingImage} media={media} setMedia={setMedia} initialData={initialData} type={type} tab={"business"}/>
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default ModifyPop;
