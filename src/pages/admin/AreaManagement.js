import React, { useState } from 'react'
import term from '../../terms'
import client from '../../API/metro'
import { Box, Grid, Typography } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { CircularProgress } from '@material-ui/core'
import AreaService from '../../hooks/DataService/AreaService'
import { AddCircleOutline } from '@material-ui/icons'
import { useSelector, useDispatch } from 'react-redux'
import { set_table_changed, set_edit_tab_data } from '../../REDUX/actions/main.actions'

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
    const [tagLink, setTagLink] = useState(false)
    const [autorityOpen, setAutorityOpen] = useState(false);
    const [tagOpen, setTagOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');

    const openAuthorityDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data([]))
            setDialogType('add')
        }
        setAutorityOpen(!autorityOpen)
    }

    const openTagDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data([]))
            setDialogType('add')
        }
        setTagOpen(!tagOpen)
    }

    const openLinkingDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('link')
        }
        else {
            dispatch(set_edit_tab_data([]))
            setDialogType('edit')
        }
        setTagLink(!tagOpen)
    }

    const remove = async (id) => {
        if (window.confirm(term('delete_confirmation'))) {
            let area_id = localStorage.getItem('aid')
            await client.service('area').patch(area_id, { $pull: { tagsIds: id } })
            // delete tag-categories where tagId = id
            await client.service('tag-categories').remove(null, { query: { tagId: id } })
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
                        // remove={remove}
                        actionBtns={true}
                        linking={openLinkingDialog}
                    /> :
                        <Box style={progress}>
                            <CircularProgress size={60} />
                        </Box>
                    }
                </Grid>
            </Grid>
            <PopupDialog open={autorityOpen} setOpen={setAutorityOpen} type={dialogType} title={term('authority')} tabs={'authority'} maxWidth={'sm'} />
            <PopupDialog open={tagOpen} setOpen={setTagOpen} type={dialogType} title={term('tags')} tabs={'tags'} maxWidth={'sm'} />
            <PopupDialog open={tagLink} setOpen={setTagLink} type={dialogType} title={term('link_tags')} tabs={'tags_link'} maxWidth={'sm'} />
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

