import React, { useEffect, useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { UploadMediaTab } from './Tabs/UploadMediaTab';
import { CircularProgress } from '@material-ui/core'
import term from '../../../../terms';
//styles
import useStyles from "../../styles";



const ModifyPop = ({ handleClose, type, initialData }) => {
    const classes = useStyles()
    //local
    const [tab, setTab] = useState(0);
    const [media, setMedia] = useState([]);
    const [loadingImage, setLoadingImage] = useState(false)

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    useEffect(() => {
        setMedia([])
        setTab(0)
    }, [handleClose])

    return (
        <div>
            {loadingImage && <div className={classes.loadingImage}>
                <CircularProgress size={50} />
            </div>}
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={b === term('gallery') && type === 'add'} />)}
                </Tabs>
            </Box>
            <DialogContent id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <ModifyTab handleClose={handleClose} initialData={initialData} type={type} setTab={0} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    {/* <UploadMediaTab open={open} setLoadingImage={setLoadingImage} setMedia={setMedia} initialData={initialData} tab={"business"} /> */}
                </TabPanel>
            </DialogContent>
        </div >
    )
}

export default ModifyPop;
