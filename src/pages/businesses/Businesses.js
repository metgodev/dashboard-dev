import React, { useState } from 'react'
import term from '../../terms'
import { Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'
import { ExportToExcel } from '../../hooks/ExportToExcel'
import { ReadFromExcel } from '../../hooks/ReadFromExcel'
import PageTitle from '../../components/PageTitle/PageTitle'
import PaginationTable from '../../components/Tables/PaginationTable'
import PopupDialog from '../../components/PopupDialog/PopupDialog'
import BusinessTableService from '../../hooks/DataService/BusinessTableService'
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import GetAppOutlinedIcon from '@mui/icons-material/GetAppOutlined';
import PublishOutlinedIcon from '@mui/icons-material/PublishOutlined';
import { CircularProgress } from '@material-ui/core'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions'

function Businesses() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);
    //table data
    let { businesses, tableCategories, keys } = BusinessTableService(rowsPerPage, page)
    const pages = Math.ceil(businesses.length / rowsPerPage - 1)
    //dialog
    const [open, setOpen] = useState(false);
    const [dialogType, setDialogType] = useState('add');
    //global 
    const { lang } = useSelector(s => s.mainRememberReducer);
    const dispatch = useDispatch();

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType('edit')
        }
        else {
            dispatch(set_edit_tab_data([]))
            setDialogType('add')
        }
        setOpen(!open)
    }
    //needs to be shown correctly on mobile too
    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('export'), func: () => ExportToExcel(businesses, 'businesses_list'), buttonIcon: <GetAppOutlinedIcon /> },
        { name: term('import'), func: ReadFromExcel, input: true, buttonIcon: <PublishOutlinedIcon /> },
        { name: term('add'), func: openDialog, buttonIcon: <AddCircleOutlineOutlinedIcon /> },
        { name: 'forward', func: () => setPage((page < pages) ? (page + 1) : page), icon: <ArrowForwardIosOutlinedIcon /> },
        { name: 'back', func: () => setPage((page >= pages) && (pages > 0) ? (page - 1) : page), icon: <ArrowBackIosNewOutlinedIcon /> },
    ]


    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('businesses')} />
            {businesses.length ? <PaginationTable
                lang={lang}
                page={page}
                keys={keys}
                setPage={setPage}
                data={businesses}
                cat={tableCategories}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                openDialog={openDialog}
                tableType={'business'}
            /> :
                <Box style={progress}>
                    <CircularProgress size={60} />
                </Box>
            }
            <PopupDialog title={term('businesses')} open={open} setOpen={setOpen} tabs={'businesess'} type={dialogType} />
        </Box>
    )
}

const progress = {
    position: "fixed",
    top: '52%',
    left: '48%',
    transform: 'translate(-50% , -50%)',
}

export default Businesses

