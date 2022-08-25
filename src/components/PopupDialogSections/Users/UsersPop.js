import React, { useState } from 'react'
import { Box } from '@mui/material'
import { ModalTabs } from './PopConfig'
import useStyles from '../styles'
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import Tab from '@mui/material/Tab';
import UsersTab from './Tabs/UsersTab'

const UsersPop = ({ handleClose, type, open }) => {

    const classes = useStyles()

    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Box>
                <Box className={classes.stickyBox} >
                    <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                        {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                    </Tabs>
                </Box>
                <Box id="alert-dialog-slide-description">
                    <TabPanel value={tab} index={0}>
                        <UsersTab handleClose={handleClose} type={type} />
                    </TabPanel>
                </Box>
            </Box >
        </Box >
    )
}

export default UsersPop;