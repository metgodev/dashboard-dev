import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { TracksTab } from './Tabs/TracksTab';
import { UploadMediaTab } from '../uploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { mediaTabConfig } from './popConfig'
import { Picker } from './Tabs/HandleTracksData'
import { useSelector } from 'react-redux';
//styles
import useStyles from "../styles";
import term from '../../../terms';
import useGetService from '../../../hooks/useGetService';

const TracksPop = ({ handleClose, type, open }) => {

    const { area } = useSelector((state) => state.mainRememberReducer);

    const classes = useStyles()

    const [tab, setTab] = useState(0);
    const [loadingImage, setLoadingImage] = useState(false)
    const [picker, setPicker] = useState(Picker)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    const query = { $limit: 1000, areaId: area.id, $select: ['_id', 'name', 'location', 'galleryFileIds'] }

    const businessData = useGetService('business', 'business-tracks-data', query, area, false)
    const poisData = useGetService('pois', 'pois-tracks-data', query, area, false)

    useEffect(() => {
        { !open && setTab(0) }
        if ((businessData.data.length > 0) && (poisData.data.length) > 0) {
            setPicker(prev => ({
                ...prev,
                objectIds: [
                    ...poisData.data.map(item => ({ ...item, id: item._id, title: `${item.name}  -  ${term("points")}` })),
                    ...businessData.data.map(item => ({ ...item, id: item._id, title: `${item.name}  -  ${term("businesses")}` }))
                ],
                pois: poisData.data.map(item => item._id),
                business: businessData.data.map(item => item._id)
            }))
        }
    }, [handleClose, businessData, poisData])

    return (
        <Box>
            {loadingImage && <Box className={classes.loadingImage}>
                <CircularProgress size={100} />
            </Box>}
            <Box className={classes.stickyBox}>
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    {picker.objectIds.length > 0 && <TracksTab areaSpecificData={picker} handleClose={handleClose} type={type} />}
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab setLoadingImage={setLoadingImage} tab={"tracks"} config={mediaTabConfig} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default TracksPop;
