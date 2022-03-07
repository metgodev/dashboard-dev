import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import { useSelector } from 'react-redux'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import BusinessTableService from '../../hooks/DataService/BusinessTableService'
import { CircularProgress } from '@material-ui/core'

function AuthorityManagement() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { businesses, tableCategories, keys } = BusinessTableService(rowsPerPage, page)
    const pages = Math.ceil(businesses.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    const [initialDataDialog, setInitialDataDialog] = useState({});
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer);

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
    //needs to be shown correctly on mobile too
    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('add_new_authority') },
    ]

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('manage_authorities')} />
        </Box>
    )
}

const progress = {
    position: "fixed",
    top: '52%',
    left: '48%',
    transform: 'translate(-50% , -50%)',
}

export default AuthorityManagement

