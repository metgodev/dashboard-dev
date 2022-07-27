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
import client from '../../../API/metro'
import { removeDuplicateObjectsFromArray } from '../../../utils/object'

const TagLinkPop = ({ handleClose, type, initialData, open }) => {
    const classes = useStyles()
    const { area } = useSelector(s => s.mainRememberReducer)
    //local
    const [tab, setTab] = useState(0);
    const [picker, setPicker] = useState(Picker)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        { !open && setTab(0) }
        (async () => {
            try {
                let tag_categories_res = await client.service("tag-categories").find({ query: { areaId: area?.id } })
                let tags_res = await client.service('tags').find({ query: { areaId: area?.id } })
                if ((tag_categories_res.total > 0) && (tags_res.total > 0)) {
                    let tagCategories = await tag_categories_res.data.map(({ category }) => ({ value: category._id, name: category.title }))
                    let tags = await tags_res.data.map((tag) => ({ value: tag._id, name: tag.title }))
                    removeDuplicateObjectsFromArray(tagCategories)
                    setPicker(prev => ({ ...prev, categoryId: removeDuplicateObjectsFromArray(tagCategories), tagId: tags }))
                }
            } catch (e) {
                console.log(e)
            }
        })();
    }, [handleClose])

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