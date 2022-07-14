import React, { useEffect, useState } from 'react'
import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TabPanel from '../../../TabPanel/TabPanel';
import { ModalTabs } from './popConfig';
import { ModifyTab } from './Tabs/ModifyTab';
import { StatisticsTab } from './Tabs/StatisticsTab';
import { CircularProgress } from '@material-ui/core'
import { UploadMediaTab } from '../uploadMediaTab'
import term from '../../../../terms';
import { mediaTabConfig } from './popConfig'
import { Button } from '@mui/material';
import chat from '../../../../Assets/placeholders/contact_bussines.png'
import comments from '../../../../Assets/placeholders/comments.png'
import promotions from '../../../../Assets/placeholders/promotions.png'
//styles
import useStyles from "../../styles";

const ModifyPop = ({ handleClose, type, initialData, open }) => {
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
        { !open && setTab(0) }
    }, [handleClose])

    return (
        <Box>
            {loadingImage &&
                <Box className={classes.loadingImage}>
                    <CircularProgress size={50} />
                </Box>}
            <Box className={classes.stickyBox} >
                <Tabs value={tab} onChange={handleTabs} aria-label="tabs" variant="scrollable" scrollButtons="auto">
                    {ModalTabs.map(b => <Tab key={b} label={b} disabled={b === term('gallery') && type === 'add'} />)}
                </Tabs>
            </Box>
            <Box id="alert-dialog-slide-description">
                <TabPanel value={tab} index={0}>
                    <ModifyTab handleClose={handleClose} initialData={initialData} type={type} setTab={0} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                    <StatisticsTab />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                    <UploadMediaTab setLoadingImage={setLoadingImage} tab={"business"} config={mediaTabConfig} />
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
                    <Box
                        style={{ //middkle of the screen
                            top: '30%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            position: 'absolute',
                        }}>
                        <Button variant="contained" color="primary" >{term('add_product')}</Button>
                    </Box>
                </TabPanel>
                <TabPanel value={tab} index={7}>
                </TabPanel>
                <TabPanel value={tab} index={8}>
                </TabPanel>
            </Box>
        </Box >
    )
}

export default ModifyPop;
