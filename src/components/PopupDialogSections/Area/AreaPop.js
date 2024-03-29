import React, { useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { AreaTab } from './Tabs/AreaTab';
//styles
import useStyles from "../styles";

const AreaPop = ({ handleClose, type }) => {

    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description" sx={{ height: '80%' }}>
                <TabPanel value={tab} index={0} style={{ height: '100%' }}>
                    <AreaTab handleClose={handleClose} type={type} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default AreaPop;