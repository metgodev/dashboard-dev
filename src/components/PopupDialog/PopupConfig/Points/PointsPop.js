import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { PointsTab } from './Tabs/PointsTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core';
//styles
import useStyles from "../../styles";


const PointsPop = ({ handleClose, type, open, initialData }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [media, setMedia] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            {loadingImage && <div className={classes.loadingImage}>
                <CircularProgress size={100} />
            </div>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <PointsTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    {/* <UploadMediaTab open={open} setLoadingImage={setLoadingImage} media={media} setMedia={setMedia} initialData={initialData} type={type} tab={"pois"} /> */}
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default PointsPop;
