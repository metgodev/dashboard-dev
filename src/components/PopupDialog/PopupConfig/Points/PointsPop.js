import React, { useState, useEffect } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { PointsTab } from './Tabs/PointsTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import { useSelector } from 'react-redux';
//styles
import useStyles from "../../styles";


const PointsPop = ({ handleClose, type, open }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [media, setMedia] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false)
    const { editTabData } = useSelector(s => s.mainReducer)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        setMedia([])
        { !open && setTab(0) }
    }, [handleClose])

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
                    <PointsTab handleClose={handleClose} initialData={editTabData} type={type} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <UploadMediaTab open={open} setLoadingImage={setLoadingImage} type={type} tab={"pois"} />
                </TabPanel>
            </Box>
        </Box >
    )
}

export default PointsPop;
