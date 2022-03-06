import React, { useState } from 'react'
import term from '../../terms'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { CircularProgress } from '@material-ui/core'
import AreaService from '../../hooks/DataService/AreaService'
import { AddCircleOutline } from '@material-ui/icons'

function AreaManagement() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { areaTags, authorities, tags, areaTagsKeys, authoritiesKeys, tagsKeys } = AreaService()
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer);
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [initialDataDialog, setInitialDataDialog] = useState({});

    const openDialog = (data) => {
        if (data) {
            setInitialDataDialog(data)
            setDialogType('edit')
        }
        else {
            setInitialDataDialog({})
            setDialogType('add')
        }
        setOpen(!open)
    }

    const remove = (id) => {
        console.log(id)
    }

    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('add_new_authority'), func: openDialog, buttonIcon: <AddCircleOutline /> },
        { name: term('add_tags'), func: openDialog, buttonIcon: <AddCircleOutline /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('manage_areas')} />
            <Grid container spacing={3}>
                <Grid item xs={9}>
                    <Typography variant="h6" component="h6">{term('authorities')}</Typography>
                    {authorities.length ? <PaginationTable
                        lang={lang}
                        page={page}
                        keys={authoritiesKeys}
                        setPage={setPage}
                        data={authorities}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        openDialog={openDialog}
                    /> :
                        <Box style={progress}>
                            <CircularProgress size={60} />
                        </Box>
                    }
                </Grid>
                <Grid item xs={3}>
                    <Typography variant="h6" component="h6">{term('tags_around')}</Typography>
                    {areaTags.length ? <PaginationTable
                        lang={lang}
                        page={page}
                        keys={areaTagsKeys}
                        setPage={setPage}
                        data={areaTags}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        openDialog={openDialog}
                        remove={remove}
                    /> :
                        <Box style={progress}>
                            <CircularProgress size={60} />
                        </Box>
                    }
                </Grid>
            </Grid>
            <PopupDialog open={open} setOpen={setOpen} type={dialogType} data={initialDataDialog} />
        </Box>
    )
}

const progress = {
    position: "fixed",
    top: '52%',
    left: '48%',
    transform: 'translate(-50% , -50%)',
}

export default AreaManagement

