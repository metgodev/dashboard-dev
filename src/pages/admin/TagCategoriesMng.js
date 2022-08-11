import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { AddCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AGTable from '../../components/Tables/AGTable'

function TagCategoriesMng() {
    const dispatch = useDispatch()
    //dialog
    const [tagLink, setTagLink] = useState(false)
    const [tagOpen, setTagOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');

    const openTagDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType('add')
        }
        setTagOpen(!tagOpen)
    }

    const openLinkingDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType('link')
        }
        setTagLink(!tagOpen)
    }

    let headerBtns = [
        { name: term('add_tags'), func: openTagDialog, buttonIcon: <AddCircleOutline /> },
        { name: term('add_connection'), func: openLinkingDialog, buttonIcon: <AddCircleOutline /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('area_related_tags')} />
            <AGTable display={'tag-categories'} action={openLinkingDialog} />
            <PopupDialog open={tagOpen} setOpen={setTagOpen} type={dialogType} title={term('tags')} tabs={'tags'} maxWidth={'sm'} />
            <PopupDialog open={tagLink} setOpen={setTagLink} type={dialogType} title={term('link_tags')} tabs={'tags_link'} maxWidth={'sm'} />
        </Box>
    )
}

export default TagCategoriesMng

