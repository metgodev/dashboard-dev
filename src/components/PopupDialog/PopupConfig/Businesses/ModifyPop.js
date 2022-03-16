import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core'
//styles
import useStyles from "../../styles";
import { useSelector } from 'react-redux';



const ModifyPop = ({ media, setMedia, handleClose, type, open }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    //global
    const { editTabData } = useSelector(s => s.mainReducer)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            {loadingImage && <div style={{ display: "flex", alignItems: "center", justifyContent: "center", position: "absolute", backgroundColor: "rgba(0,0,0,0.5)", top: "0", left: "0", right: "0", bottom: "0", zIndex: "5" }}>
                <CircularProgress size={100} />
            </div>}
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <ModifyTab handleClose={handleClose} initialData={editTabData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <UploadMediaTab open={open} setLoadingImage={setLoadingImage} media={media} setMedia={setMedia} initialData={editTabData} tab={"business"} />
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default ModifyPop;
