import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import PageTitle from '../../components/PageTitle/PageTitle'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import { AddCircleOutline } from '@material-ui/icons'
import { useDispatch } from 'react-redux'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'
import AGTable from '../../components/Tables/AGTable'

function AuthorityMng() {
    const dispatch = useDispatch()
    //dialog
    const [autorityOpen, setAutorityOpen] = useState(false);
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



    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('add_new_authority'), func: openAuthorityDialog, buttonIcon: <AddCircleOutline /> },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('authorities')} />
            <AGTable display={'authorities'} action={setAutorityOpen} />
            <PopupDialog open={autorityOpen} setOpen={setAutorityOpen} type={dialogType} title={term('authority')} tabs={'authority'} maxWidth={'sm'} />
        </Box>
    )
}

export default AuthorityMng

