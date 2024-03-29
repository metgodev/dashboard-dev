import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { AddCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AGTable from '../../components/Tables/AGTable'
import MODAL_STATES from '../../data/modal_states'
import BACK_ROUTES from '../../data/back_routes'
import MODAL_TYPES from '../../data/modal_types'
import getWindowSize from '../../hooks/useGetWindowSize'
import MobileTable from '../../components/MobileTable/MobileTable'
import { MOBILE_WIDTH } from '../../data/constants'

function TagCategoriesMng() {
    const dispatch = useDispatch()
    const { width, height } = getWindowSize();
    //dialog
    const [tagLink, setTagLink] = useState(false)
    const [tagOpen, setTagOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);

    const openTagDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.ADD)
        }
        setTagOpen(!tagOpen)
    }

    const openLinkingDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.LINK)
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
            {width > MOBILE_WIDTH && <AGTable display={BACK_ROUTES.TAG_CATEGORIES} action={openLinkingDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.TAG_CATEGORIES} action={openLinkingDialog} />}
            <PopupDialog open={tagOpen} setOpen={setTagOpen} type={dialogType} title={term('tags')} tabs={MODAL_TYPES.TAGS} maxWidth={'sm'} />
            <PopupDialog open={tagLink} setOpen={setTagLink} type={dialogType} title={term('link_tags')} tabs={MODAL_TYPES.TAGS_LINK} maxWidth={'sm'} />
        </Box>
    )
}

export default TagCategoriesMng

