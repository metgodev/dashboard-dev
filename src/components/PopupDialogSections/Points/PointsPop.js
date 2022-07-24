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

const PointsPop = ({ handleClose, type, open }) => {
    const classes = useStyles()
    //local
    const { area } = useSelector((state) => state.mainRememberReducer);
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
