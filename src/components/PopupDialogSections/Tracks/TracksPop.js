import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TracksTab } from './Tabs/TracksTab';
import { UploadMediaTab } from '../uploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { mediaTabConfig } from './popConfig'
import { Picker } from './Tabs/HandleTracksData'
import client from '../../../API/metro'
import { useSelector } from 'react-redux';
//styles
import useStyles from "../styles";

const TracksPop = ({ handleClose, type, open }) => {

    const { area } = useSelector((state) => state.mainRememberReducer);

    const classes = useStyles()

    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    const [picker, setPicker] = useState(Picker)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        { !open && setTab(0) }
        (async () => {
            try {
                const auth = await client.service("authorities").find({ query: { areaId: area.id } })
                if (auth.total > 0) {
                    const results = auth.data.map(({ name, _id }) => ({ value: _id, name }))
                    setPicker(prev => ({ ...prev, authorityId: results }))
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [handleClose])

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
                    {picker.authorityId.length > 0 && <TracksTab areaSpecificData={picker} handleClose={handleClose} type={type} />}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab setLoadingImage={setLoadingImage} tab={"tracks"} config={mediaTabConfig} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default TracksPop;
