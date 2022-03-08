import React, { useState } from 'react'
import term from '../../terms'
import { Box, Grid, Typography } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { CircularProgress } from '@material-ui/core'
import AreaService from '../../hooks/DataService/AreaService'
import { AddCircleOutline } from '@material-ui/icons'
import { client } from '../../API/metro'
import { set_table_changed } from '../../REDUX/actions/main.actions'

function AreaManagement() {
    const [autorityPage, setAutorityPage] = useState(0);
    const [tagPage, setTagPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { areaTags, authorities, tags, areaTagsKeys, authoritiesKeys, tagsKeys } = AreaService()
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer);
    const dispatch = useDispatch()
    //dialog
    const [autorityOpen, setAutorityOpen] = useState(false);
    const [tagOpen, setTagOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [initialDataDialog, setInitialDataDialog] = useState({});

    const openAuthorityDialog = (data) => {
        if (data) {
            setDialogType('edit')
            setInitialDataDialog(data)
        } else {
            setDialogType('add')
            setInitialDataDialog({})
        }
        setAutorityOpen(!autorityOpen)
    }

    const openTagDialog = (data) => {
        if (data) {
            setDialogType('edit')
            setInitialDataDialog(data)
        } else {
            setDialogType('add')
            setInitialDataDialog({})
        }
        setTagOpen(!tagOpen)
    }

    const remove = async (id) => {
        if (window.confirm(term('Are you sure you want to delete this item?'))) {
            let area_id = localStorage.getItem('aid')
            await client.service('area').patch(area_id, {
                $pull: {
                    tagsIds: id
                }
            })
            await client.service('tags').remove(id)
                .then(() => dispatch(set_table_changed('remove' + Math.random())))
        }
    }

    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('add_new_authority'), func: openAuthorityDialog, buttonIcon: <AddCircleOutline /> },
        { name: term('add_tags'), func: openTagDialog, buttonIcon: <AddCircleOutline /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('manage_area')} />
            <Grid container spacing={3}>
                <Grid item lg={6} md={6} sm={12} xs={12} >
                    <Typography variant="h6" component="h6">{term('authorities')}</Typography>
                    {authorities.length ? <PaginationTable
                        lang={lang}
                        page={autorityPage}
                        keys={authoritiesKeys}
                        setPage={setAutorityPage}
                        data={authorities}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        openDialog={openAuthorityDialog}
                        actionBtns={true}
                    /> :
                        <Box style={progress}>
                            <CircularProgress size={60} />
                        </Box>
                    }
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography variant="h6" component="h6">{term('area_related_tags')}</Typography>
                    {areaTags.length ? <PaginationTable
                        lang={lang}
                        page={tagPage}
                        keys={areaTagsKeys}
                        setPage={setTagPage}
                        data={areaTags}
                        rowsPerPage={rowsPerPage}
                        setRowsPerPage={setRowsPerPage}
                        openDialog={openTagDialog}
                        remove={remove}
                        actionBtns={true}
                    /> :
                        <Box style={progress}>
                            <CircularProgress size={60} />
                        </Box>
                    }
                </Grid>
            </Grid>
            <PopupDialog open={autorityOpen} setOpen={setAutorityOpen} type={dialogType} initialData={initialDataDialog} title={term('authority')} tabs={'authority'} />
            <PopupDialog open={tagOpen} setOpen={setTagOpen} type={dialogType} initialData={initialDataDialog} title={term('tags')} tabs={'tags'} />
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

