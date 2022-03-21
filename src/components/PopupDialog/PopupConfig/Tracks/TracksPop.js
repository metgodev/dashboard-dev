import React, { useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TracksTab } from './Tabs/TracksTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core';
//styles
import useStyles from "../../styles";

const TracksPop = ({ handleClose, type, open, initialData }) => {
    //local 
    const classes = useStyles()
    const [tab, setTab] = useState(0);
    const [media, setMedia] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box>
            {loadingImage && <Box className={classes.loadingImage}>
                <CircularProgress size={100} />
            </Box>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <TracksTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    {/* <UploadMediaTab open={open} media={media} setMedia={setMedia} initialData={initialData} type={type} tab={"tracks"} /> */}
                </TabPanel>
            </Box>
        </Box >
    )
}

export default TracksPop;
