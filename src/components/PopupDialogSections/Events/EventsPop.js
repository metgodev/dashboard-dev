import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { mediaTabConfig } from './popConfig'
import { CircularProgress } from '@material-ui/core'
import { UploadMediaTab } from '../uploadMediaTab'
import { ModifyEventsTab } from './Tabs/ModifyEventTab';
//styles
import useStyles from "../styles";
import { Picker } from './Tabs/HandleEventsData'
import term from '../../../terms';
import { useSelector } from 'react-redux';
import useGetService from '../../../hooks/useGetService'

const EventsPop = ({ handleClose, type, open }) => {
    //Styles
    const classes = useStyles()
    //Global
    const { area } = useSelector((state) => state.mainRememberReducer);
    //local
    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    const [picker, setPicker] = useState(Picker)
    //Service data
    const authoritiesData = useGetService("authorities", "authorities", { areaId: area.id }, area, false)
    const tagCategories = useGetService("tag-categories", "tag-categories", { areaId: area.id }, area, false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        { !open && setTab(0) }
        if (authoritiesData.data.length && tagCategories.data.length) {
            let authorities = authoritiesData.data.map(({ name, _id }) => ({ value: _id, name }))
            let tag_categories = tagCategories.data.map((data) => ({ title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id }));
            setPicker(prev => ({ ...prev, authorityId: authorities, tagsIds: tag_categories }))
        }
    }, [handleClose, authoritiesData, tagCategories])

    return (
        <Box sx={{ height: "100%" }}>
            {loadingImage && <Box className={classes.loadingImage}>
                <CircularProgress size={100} />
            </Box>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description" sx={{ height: "90%" }}>
                <TabPanel value={tab} index={0} >
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
