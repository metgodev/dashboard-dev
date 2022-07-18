import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { UploadMediaTab } from '../uploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { mediaTabConfig } from './popConfig'
//styles
import useStyles from "../../styles";
import ModifyPointTab from './Tabs/ModifyPointTab';
import term from '../../../../terms';
import client from '../../../../API/metro'
import { useSelector } from 'react-redux';
import { Picker } from './Tabs/HandlePointsData'

const PointsPop = ({ handleClose, type, open }) => {
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
    }, [handleClose])

    useEffect(() => {
        (() => {
            client
                .service("tag-categories")
                .find({ query: { areaId: area.id } })
                .then(({ data }) => {
                    return data.map(
                        (data) =>
                        (
                            ({ title: data.tag.title + " - " + term(data.category.title.toLowerCase()), id: data._id, idToSend: data.tag._id })
                        )
                    )
                }).then(res => {
                    setPicker(prev => ({ ...prev, tagsIds: res }))
                }).catch(e => console.log(e))
            client.service("authorities").find({ query: { areaId: area.id } })
                .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
                .then((authorities => setPicker(prev => ({ ...prev, authorityId: authorities }))))
                .catch(e => console.log(e))
        })();
    }, [])

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
