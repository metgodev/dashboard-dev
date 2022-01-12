import React, {useState} from 'react'
import EditIcon from "@mui/icons-material/Edit";
import TabPanel from '../../TabPanel/TabPanel';
import { DialogActions, FormControl, Grid, InputLabel, TextField } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Box from "@mui/material/Box";
import { Button } from "../../Wrappers/Wrappers";
import term from "../../../terms"      


let ModalTabs = ['details', 'statistics', 'gallery', 'promotion', 'calls']
let ModalInit = [
    { title: 'businesse_name', id: 1, label: 'businesse_name', rows: 1, maxRows: 4, func: () => { } },
    { title: 'suitable_for', id: 7, label: 'suitable_for', rows: 1, maxRows: 4, func: () => { } },
    { title: 'address', id: 2, label: 'address', rows: 1, maxRows: 4, func: () => { } },
    { title: 'description', id: 8, label: 'description', rows: 1, maxRows: 4, func: () => { } },
    { title: 'tags', id: 3, label: 'tags', rows: 4, maxRows: 4, func: () => { } },
    { title: 'opening_hours', id: 9, label: 'opening_times', rows: 1, maxRows: 4, func: () => { } },
    { title: 'contact', id: 4, label: 'contact', rows: 1, maxRows: 4, func: () => { } },
    { title: 'contact_number', id: 10, label: 'contact_number', rows: 1, maxRows: 4, func: () => { } },
    { title: 'site_link', id: 5, label: 'site_link', rows: 1, maxRows: 4, func: () => { } },
    { title: 'business_number', id: 11, label: 'business_number', rows: 1, maxRows: 4, func: () => { } },
    { title: 'authority', id: 6, label: 'authority', rows: 1, maxRows: 4, func: () => { } },
    { title: 'email_address', id: 12, label: 'email', rows: 1, maxRows: 4, func: () => { } },
]



export const BusinessesPopUp = () => {

    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <DialogActions>
                <Box sx={{ borderBottom: .1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={tab} onChange={handleTabs} centered aria-label="tabs" variant="scrollable" scrollButtons="auto">
                        {ModalTabs.map(b => <Tab label={term(b)} />)}
                    </Tabs>
                </Box>
            </DialogActions>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={2}>
                            {ModalInit.map(({ title, id, label, rows, maxRows, func }) =>
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <InputLabel> {term(title)} </InputLabel>
                                    <FormControl fullWidth  >
                                        <TextField
                                            size="small"
                                            id={id}
                                            label={term(label)}
                                            placeholder={term(title)}
                                            multiline
                                            rows={rows}
                                            maxRows={maxRows}
                                        />
                                    </FormControl>
                                </Grid>
                            )}
                            <Box sx={{borderBottom: .1, borderColor: 'divider', width: '100%', paddingTop: 2 }} />
                            <Button
                                style={{ marginTop: 7, right: 720}}
                                color="primary"
                                onClick={() => { console.log('added') }}>
                                <EditIcon></EditIcon>
                                {term('edit')}
                            </Button>
                        </Grid>
                    </TabPanel>
                </DialogContentText>
            </DialogContent>
        </div>
    )
}

export default BusinessesPopUp