import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../TabPanel/TabPanel';
import { DialogActions, FormControl, Grid, InputLabel, TextField } from '@mui/material';
import { Box } from '@mui/system';
import { Button } from '../../Wrappers/Wrappers';

let ModalTabs = ['details', 'statistics', 'gallery', 'promotion', 'calls']
let ModalInit = [
    { title: 'bussines name', id: 1, label: 'bussines name', rows: 1, maxRows: 4, func: () => { } },
    { title: 'suitable for', id: 7, label: 'suitable for', rows: 1, maxRows: 4, func: () => { } },
    { title: 'adress', id: 2, label: 'adress', rows: 1, maxRows: 4, func: () => { } },
    { title: 'description', id: 8, label: 'description', rows: 1, maxRows: 4, func: () => { } },
    { title: 'tags', id: 3, label: 'tags', rows: 4, maxRows: 4, func: () => { } },
    { title: 'opening times', id: 9, label: 'opening times', rows: 1, maxRows: 4, func: () => { } },
    { title: 'number to contact', id: 4, label: 'number', rows: 1, maxRows: 4, func: () => { } },
    { title: 'phone number', id: 10, label: 'phone number', rows: 1, maxRows: 4, func: () => { } },
    { title: 'website link', id: 5, label: 'website link', rows: 1, maxRows: 4, func: () => { } },
    { title: 'bussines phone', id: 11, label: 'bussines phone', rows: 1, maxRows: 4, func: () => { } },
    { title: 'authority', id: 6, label: 'authority', rows: 1, maxRows: 4, func: () => { } },
    { title: 'email', id: 12, label: 'email', rows: 1, maxRows: 4, func: () => { } },
]

const BusinesPop = () => {
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <DialogActions>
                <Box sx={{ borderBottom: .1, borderColor: 'divider', width: '100%' }}>
                    <Tabs value={tab} onChange={handleTabs} centered aria-label="tabs" variant="scrollable" scrollButtons="auto">
                        {ModalTabs.map(b => <Tab label={b} />)}
                    </Tabs>
                </Box>
            </DialogActions>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    <TabPanel value={tab} index={0}>
                        <Grid container spacing={2}>
                            {ModalInit.map(({ title, id, label, rows, maxRows, func }) =>
                                <Grid item lg={6} md={12} sm={12} xs={12} >
                                    <InputLabel>{title}</InputLabel>
                                    <FormControl fullWidth  >
                                        <TextField
                                            size="small"
                                            id={id}
                                            label={label}
                                            placeholder={title}
                                            multiline
                                            rows={rows}
                                            maxRows={maxRows}
                                        />
                                    </FormControl>
                                </Grid>
                            )}
                            <Box sx={{ borderBottom: .1, borderColor: 'divider', width: '100%', paddingTop: 1 }} />
                            <Button
                                style={{ marginTop: 5 }}
                                color="primary"
                                onClick={() => { console.log('added') }}>
                                edit
                            </Button>
                        </Grid>
                    </TabPanel>
                </DialogContentText>
            </DialogContent>
        </div>
    )
}

export default BusinesPop
