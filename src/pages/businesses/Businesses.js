import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import { Typography } from '../../components/Wrappers/Wrappers' 
import Table from '../../components/BusinessTable/Table'
import { Grid, Box, Icon } from '@mui/material'
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import config from '../../config'
import Popup from '../../components/Popup/Popup';
import {ExportToPdf } from '../../hooks/ExportToPdf'


function Businesses() {
    //popup
    const [open, setOpen] = useState(false);


    let businessHeaderButtons = [
        { name: term('Import to xslx'), func: () => console.log('import') },
        { name: term('Export to xslx'), func: () => console.log('export') },
        { name: term('Add'), func: () => setOpen(true) },
        { name: term('Previous'), func: () => console.log('prev'), icon: <ChevronRightOutlinedIcon /> },
        { name: term('Next'), func: () => console.log('next'), icon: <ChevronLeftOutlinedIcon /> } ,
    ]

    const tableHeaderCells = [
        {empty:true},
        { name:"Status", options:["first", "second"] },
        { name:"Name", options:["first", "second"] },
        { name:"Impact", options:["first", "second"] },
        { name:"Category", options:["first", "second"] },
        { name:"Tag", options:["first", "second"] },
        { name:"Authority", options:["first", "second"] },
        { name:"Address", options:["first", "second"] },
        { name:"Edit", options:["first", "second"] },
        { name:"Search", button:true },
      ]

      let [numberOfRows, setNumberOfRows] = useState(config.table.length)

    return (
        <Box>
            <Grid container direction="row" justifyContent="flex-end">
                <Grid item>
                    <Box display="flex" justifyContent="center" marginTop="30px"> 
                      <Typography> Showing {numberOfRows} results </Typography>   
                    </Box>
                </Grid>
                <Grid item >
                      <PageTitle title={term('businesses')} buttonGroup={{ btns: businessHeaderButtons }} numberOfRowsInBusinessTable={numberOfRows} />
                </Grid>
            </Grid>
            <Table
            tableHeaderCells={ tableHeaderCells }
            tableRows={config.table}
            updateNumberOfRowsInHeaderFunction={setNumberOfRows}
            />
            <Popup title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} />
        </Box>
    )
}

export default Businesses


