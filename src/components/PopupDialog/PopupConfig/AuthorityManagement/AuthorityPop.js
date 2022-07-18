import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { AuthorityTab } from './Tabs/AuthorityTab';
//styles
import useStyles from "../../styles";
import client from '../../../../API/metro'

const AuthorityPop = ({ handleClose, type, initialData, open }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(null)

    useEffect(() => {
        (async () => {
            client.service("area").find().then((res) => {
                return res?.data.map(({ name, _id }) => ({ value: _id, name }))
            }).then(res => {
                setPicker({ areaId: res })
            })
        })();
    }, []);

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
                    <AuthorityTab options={picker} handleClose={handleClose} initialData={initialData} type={type} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default AuthorityPop;
