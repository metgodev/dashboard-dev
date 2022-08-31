import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabPanel from '../../TabPanel/TabPanel'
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { CircularProgress } from '@material-ui/core'
import { UploadMediaTab } from '../uploadMediaTab'
import term from '../../../terms';
import { mediaTabConfig } from './popConfig'
import { Tabs } from '@mui/material';
import AddProductsTab from './Tabs/AddProductsTab';
import chat from '../../../Assets/placeholders/contact_bussines.png'
import comments from '../../../Assets/placeholders/comments.png'
import promotions from '../../../Assets/placeholders/promotions.png'
//styles
import useStyles from "../styles";
import { useSelector } from 'react-redux';
import { Picker } from './Tabs/HandleBusinessData';
import useGetService from '../../../hooks/useGetService'

const ModifyPop = ({ handleClose, type, open }) => {
    //Styles
    const classes = useStyles()
    //Global
    const { area } = useSelector((state) => state.mainRememberReducer);
    //Local
    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(Picker)
    //Lifecycle
    useEffect(() => {
        { !open && setTab(0) }
    }, [handleClose])
    //Service data
    const authoritiesData = useGetService("authorities", "authorities", { areaId: area.id }, area, false)
    const tagCategories = useGetService("tag-categories", "tag-categories", { areaId: area.id }, area, false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (authoritiesData.data.length && tagCategories.data.length) {
            let authorities = authoritiesData.data.map(({ name, _id }) => ({ value: _id, name }))
            let tag_categories = tagCategories.data.map((data) => ({ category: data.category.title, title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id }));
            setPicker(prev => ({ ...prev, authorityId: authorities, tagsIds: tag_categories, areaId: area.id }))
        }
    }, [authoritiesData, tagCategories, handleClose]);

    return (
        <div style={{ height: '100%' }}>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={(b === term('gallery') || b === term('products')) && type === 'add'} />)}
                </Tabs>
            </Box>
            <Box sx={{ height: '90%' }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    {picker.authorityId.length > 0 && <ModifyTab handleClose={handleClose} type={type} areaSpecificData={picker} />}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <UploadMediaTab type={'gallery'} tab={"business"} config={mediaTabConfig} />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <img src={promotions} alt="promotions"
                    />
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    <img src={chat} alt="chat" />
                </TabPanel>
                <TabPanel value={tab} index={5}>
                    <img src={comments} alt="comments" />
                </TabPanel>
                <TabPanel value={tab} index={6}>
                    {picker.tagsIds.length > 0 && <AddProductsTab type={type} areaSpecificData={picker} handleClose={handleClose} />}
                </TabPanel>
                <TabPanel value={tab} index={7}>
                </TabPanel>
                <TabPanel value={tab} index={8}>
                </TabPanel>
            </Box>
        </div >
    )
}

export default ModifyPop;
