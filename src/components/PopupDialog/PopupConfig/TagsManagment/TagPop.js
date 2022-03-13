import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TagsTab } from './Tabs/TagsTab';
//styles
import useStyles from "../../styles";



const TagPop = ({ handleClose, initialData, type }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };



    return (
        <div>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <DialogContent sx={{ p: 2 }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <TagsTab handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default TagPop;
