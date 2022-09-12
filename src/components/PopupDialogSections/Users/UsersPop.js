import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { ModalTabs } from './PopConfig'
import useStyles from '../styles'
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import Tab from '@mui/material/Tab';
import UsersTab from './Tabs/UsersTab'
import useGetService from '../../../hooks/useGetService';
import term from '../../../terms';
import ROLES from '../../../data/roles';

const UsersPop = ({ handleClose, type, open }) => {

    const classes = useStyles()

    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState({ roles: [] })

    const roles = useGetService("roles", "roles", {}, false, false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (roles.data.length) {
            let userRoles = roles.data.filter(({ name }) => { return (name !== ROLES.MEMBER) }).map(({ name, _id }) => {
                return (
                    { value: _id, name: term(name.toLowerCase()) }
                )
            })
            setPicker({ roles: userRoles })
        }
    }, [roles, handleClose]);

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
                        {picker.roles.length > 0 && <UsersTab handleClose={handleClose} type={type} areaSpecificData={picker} />}
                    </TabPanel>
                </Box>
            </Box >
        </Box >
    )
}

export default UsersPop;