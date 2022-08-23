import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { UploadMediaTab } from '../uploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { mediaTabConfig } from './popConfig'
//styles
import useStyles from "../styles";
import ModifyPointTab from './Tabs/ModifyPointTab';
import term from '../../../terms';
import client from '../../../API/metro'
import { useSelector } from 'react-redux';
import { Picker } from './Tabs/HandlePointsData'
import useGetService from '../../../hooks/useGetService'

const PointsPop = ({ handleClose, type, open }) => {
    const classes = useStyles()
    //local
    const { area } = useSelector((state) => state.mainRememberReducer);
    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    const [picker, setPicker] = useState(Picker)

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
    }, [authoritiesData, tagCategories, handleClose]);

    return (
        <Box sx={{ height: '100%' }}>
            {loadingImage && <Box className={classes.loadingImage}>
                <CircularProgress size={100} />
            </Box>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description" sx={{ height: "90%" }}>
                <TabPanel value={tab} index={0}>
                    <ModifyPointTab type={type} areaSpecificData={picker} handleClose={handleClose} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab setLoadingImage={setLoadingImage} tab={"pois"} config={mediaTabConfig} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default PointsPop;
