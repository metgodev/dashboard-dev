import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TracksTab } from './Tabs/TracksTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';

const TracksPop = ({ handleClose, initialData, type }) => {
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <Box sx={{ borderBottom: .1, borderColor: 'lightGray', width: '100%' }}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <TracksTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab />
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default TracksPop;
