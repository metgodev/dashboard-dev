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
//styles
import useStyles from "../../styles";



const ModifyPop = ({ handleClose, initialData, type }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };
    const [imagesArr, setImagesArr] = useState([]);
    const [videoArr, setVideoArr] = useState([]);
    const [logo,setLogo] = useState([]);
    const [files,setFiles] = useState([]);



    return (
        <div>
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
                    <UploadMediaTab
                        imagesArr={imagesArr} setImagesArr={setImagesArr}
                        videoArr={videoArr} setVideoArr={setVideoArr}
                        logo={logo} setLogo={setLogo}
                        files={files} setFiles={setFiles}
                        initialData={initialData} 
                        type={type} 
                    />
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default ModifyPop;
