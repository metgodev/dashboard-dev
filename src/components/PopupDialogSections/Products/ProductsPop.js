import React, { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { mediaTabConfig, ModalTabs } from './PopConfig'
import useStyles from '../styles'
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import Tab from '@mui/material/Tab';
import ModifyProductTab from './Tabs/ModifyProductTab'
import { UploadMediaTab } from '../uploadMediaTab';
import { Picker } from './PopConfig'
import term from '../../../terms';
import { useSelector } from 'react-redux';
import useGetService from '../../../hooks/useGetService';

const ProductsPop = ({ handleClose, type, open }) => {

    const classes = useStyles()
    const { area } = useSelector((state) => state.mainRememberReducer);

    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(Picker)

    useEffect(() => {
        { !open && setTab(0) }
        let tag_categories = tagCategories.data.map((data) => ({ title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id }));
        setPicker(prev => ({ ...prev, tagsIds: tag_categories, areaId: area.id }))
    }, [handleClose])

    const tagCategories = useGetService("tag-categories", "tag-categories", { areaId: area.id }, area, false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <Box sx={{ height: '100%' }}>
            <Box>
                <Box className={classes.stickyBox} >
                    <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                        {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add' && b === term('images')} />)}
                    </Tabs>
                </Box>
                <Box id="alert-dialog-slide-description">
                    <TabPanel value={tab} index={0}>
                        {picker.tagsIds.length > 0 && <ModifyProductTab handleClose={handleClose} areaSpecificData={picker} />}
                    </TabPanel>
                    <TabPanel value={tab} index={1}>
                        <UploadMediaTab type={'gallery'} tab={"products"} config={mediaTabConfig} />
                    </TabPanel>
                </Box>
            </Box >
        </Box >
    )
}

export default ProductsPop;