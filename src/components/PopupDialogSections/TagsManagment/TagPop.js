import React, { useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { NewTagTab } from './Tabs/NewTagTab';
//styles
import useStyles from "../styles";

const TagPop = ({ handleClose, type, initialData, open }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <NewTagTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default TagPop;