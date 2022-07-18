import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { mediaTabConfig } from './popConfig'
import { CircularProgress } from '@material-ui/core'
import { UploadMediaTab } from '../uploadMediaTab'
import { ModifyEventsTab } from './Tabs/ModifyEventTab';
//styles
import useStyles from "../../styles";
import { Picker } from './Tabs/HandleEventsData'
import client from '../../../../API/metro'
import term from '../../../../terms';
import { useSelector } from 'react-redux';

const EventsPop = ({ handleClose, type, open }) => {
    const classes = useStyles()
    //local
    const { area } = useSelector((state) => state.mainRememberReducer);
    const [tab, setTab] = useState(0);
    const [media, setMedia] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false)
    const [picker, setPicker] = useState(Picker)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        setMedia([])
        { !open && setTab(0) }
        (async () => {
            try {
                let authorities_res = await client.service("authorities").find({ query: { areaId: area.id } })
                let tag_categories_res = await client.service("tag-categories").find({ query: { areaId: area.id } })
                if ((authorities_res.total > 0) && (tag_categories_res.total > 0)) {
                    let authorities = await authorities_res.data.map(({ name, _id }) => ({ value: _id, name }))
                    let tag_categories = await tag_categories_res.data.map((data) => ({ title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id, idToSend: data.tag._id }));
                    setPicker(prev => ({ ...prev, authorityId: authorities, tagsIds: tag_categories }))
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [handleClose])

    return (
        <Box>
            {loadingImage && <Box className={classes.loadingImage}>
                <CircularProgress size={100} />
            </Box>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    {(picker.tagsIds.length > 0 && picker.authorityId.length > 0) ?
                        <ModifyEventsTab handleClose={handleClose} type={type} areaSpecificData={picker} /> : <></>
                    }
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab config={mediaTabConfig} setLoadingImage={setLoadingImage} tab={"events"} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default EventsPop;
