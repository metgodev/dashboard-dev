import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { LinkTabsTab } from './Tabs/LinkTabsTab';
//styles
import useStyles from "../styles";
import { Picker } from './Tabs/HandleTagData'
import { useSelector } from 'react-redux';
import { removeDuplicateObjectsFromArray } from '../../../utils/object'
import useGetService from '../../../hooks/useGetService'

const TagLinkPop = ({ handleClose, type, initialData, open }) => {
    const classes = useStyles()
    const { area } = useSelector(s => s.mainRememberReducer)
    //local
    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(Picker)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    const tagCategoriesData = useGetService("tag-categories", "tag-categories", { areaId: area.id }, area, false)
    const tagsData = useGetService("tags", "tags", { areaId: area.id }, area, false)

    useEffect(() => {
        { !open && setTab(0) }
        if ((tagCategoriesData.data.length > 0) && (tagsData.data.length > 0)) {
            let tagCategories = tagCategoriesData.data.map(({ category }) => ({ value: category._id, name: category.title }))
            let tags = tagsData.data.map((tag) => ({ value: tag._id, name: tag.title }))
            setPicker(prev => ({ ...prev, categoryId: removeDuplicateObjectsFromArray(tagCategories), tagId: tags }))
        }
    }, [handleClose, tagCategoriesData, tagsData])

    return (
        <Box>
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    {picker.categoryId && picker.tagId &&
                        <LinkTabsTab areaSpecificData={picker} handleClose={handleClose} initialData={initialData} type={type} />
                    }
                </TabPanel>
            </Box>
        </Box >
    )
}

export default TagLinkPop;