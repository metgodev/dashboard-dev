import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabPanel from '../../TabPanel/TabPanel'
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { UploadMediaTab } from '../uploadMediaTab'
import term from '../../../terms';
import { mediaTabConfig } from './popConfig'
import { Tabs } from '@mui/material';
import AddProductsTab from './Tabs/AddProductsTab';
import AdminPremiumTab from './Tabs/AdminPremiumTab';
//styles
import useStyles from "../styles";
import { useSelector } from 'react-redux';
import { Picker } from './Tabs/HandleBusinessData';
import useGetService from '../../../hooks/useGetService'
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PremiumTab from './Tabs/PremiumTab';
import MODAL_STATES from '../../../data/modal_states';
import GetRole from '../../../hooks/GetRole';
import ROLES from '../../../data/roles';
import ENTITY_STATUS from '../../../data/entity_status';

const ModifyPop = ({ handleClose, type, open }) => {
    //Styles
    const classes = useStyles()
    //Global
    const { area } = useSelector((state) => state.mainRememberReducer);
    const businessData = useSelector(s => s.mainReducer.editTabData)
    const role = GetRole()
    //Local
    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(Picker)
    //Lifecycle
    useEffect(() => {
        { !open && setTab(0) }
    }, [handleClose])
    //Service data
    const authoritiesData = useGetService("authorities", "authorities", { areaId: area.id }, area)
    const tagCategories = useGetService("tag-categories", "tag-categories", { areaId: area.id }, area)
    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        if (authoritiesData.data.length && tagCategories.data.length) {
            let authorities = authoritiesData.data.map(({ name, _id }) => ({ value: _id, name }))
            let tag_categories = tagCategories.data.map((data) => ({ category: data.category.title, title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id }));
            setPicker(prev => ({ ...prev, authorityId: authorities, tags: tag_categories, areaId: area.id }))
        }
    }, [authoritiesData, tagCategories, handleClose]);

    return (
        <div style={{ height: '100%' }}>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {type === MODAL_STATES.ADD ?
                        [
                            <Tab
                                key={term('details')}
                                label={term('details')}
                            />
                        ]
                        :
                        ModalTabs.map(tab =>
                            <Tab
                                key={tab}
                                label={tab}
                                style={tab === term('products') || tab === term('invitation_manager') || tab === term('sales') ? { backgroundColor: '#E8FEDF' } : tab === term('premium') ? { backgroundColor: '#79E54A', color: 'white' } : {}}
                                icon={tab === term('premium') ? <LockOpenIcon /> : null}
                                iconPosition='top'
                                disabled={(businessData.isPremium === ENTITY_STATUS.PRIVATE || businessData.isPremium === ENTITY_STATUS.PENDING_APPROVAL || Boolean(businessData.isPremium) === false) && (tab === term('products') || tab === term('invitation_manager') || tab === term('sales'))}
                            />
                        )
                    }
                </Tabs>
            </Box>
            <Box sx={{ height: '90%' }} id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    {picker.authorityId.length > 0 && <ModifyTab handleClose={handleClose} type={type} areaSpecificData={picker} />}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab type={'gallery'} tab={"business"} config={mediaTabConfig} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={3}>
                    <span className={classes.soonContainer}>{term('soon')}</span>
                </TabPanel>
                <TabPanel value={tab} index={4}>
                    <span className={classes.soonContainer}>{term('soon')}</span>
                </TabPanel>
                <TabPanel value={tab} index={5}>
                    <span className={classes.soonContainer}>{term('soon')}</span>
                </TabPanel>
                <TabPanel value={tab} index={6}>
                    {picker.authorityId.length > 0 &&
                        <AddProductsTab type={type} areaSpecificData={picker} handleClose={handleClose} />
                    }
                </TabPanel>
                <TabPanel value={tab} index={7}>
                    <span className={classes.soonContainer}>{term('soon')}</span>
                </TabPanel>
                <TabPanel value={tab} index={8}>
                    <span className={classes.soonContainer}>{term('soon')}</span>
                </TabPanel>
                <TabPanel value={tab} index={9}>
                    {role === ROLES.BUSINESS_OWNER && <PremiumTab handleClose={handleClose} />}
                    {(role === ROLES.SUPER_ADMIN || role === ROLES.ADMIN) && <AdminPremiumTab handleClose={handleClose} />}
                </TabPanel>
                {/* <TabPanel value={tab} index={4}>
                </TabPanel> */}
            </Box>
        </div >
    )
}

export default ModifyPop;
