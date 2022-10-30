import { Box } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import MobileTable from '../../components/MobileTable/MobileTable';
import PageTitle from '../../components/PageTitle/PageTitle';
import PopupDialog from '../../components/PopupDialog/PopupDialog';
import AGTable from '../../components/Tables/AGTable';
import BACK_ROUTES from '../../data/back_routes';
import { MOBILE_WIDTH } from '../../data/constants';
import MODAL_STATES from '../../data/modal_states';
import MODAL_TYPES from '../../data/modal_types';
import getWindowSize from '../../hooks/useGetWindowSize'
import { set_edit_tab_data } from '../../REDUX/actions/main.actions';
import term from '../../terms';

function AreaMng() {

    const dispatch = useDispatch()
    //dialog
    const [areaOpen, setAreaOpen] = useState(false);
    const [dialogType, setDialogType] = useState(MODAL_STATES.ADD);

    const { width, height } = getWindowSize();

    const openDialog = (data) => {
        if (data) {
            dispatch(set_edit_tab_data(data))
            setDialogType(MODAL_STATES.EDIT)
        }
        else {
            dispatch(set_edit_tab_data({}))
            setDialogType(MODAL_STATES.ADD)
        }
        setAreaOpen(!areaOpen)
    }

    return (
        <Box>
            <PageTitle title={term('area')} />
            {width > MOBILE_WIDTH && <AGTable display={BACK_ROUTES.AREA} action={openDialog} />}
            {width <= MOBILE_WIDTH && <MobileTable display={BACK_ROUTES.AREA} action={openDialog} />}
            <PopupDialog open={areaOpen} setOpen={setAreaOpen} type={dialogType} title={term('area')} tabs={MODAL_TYPES.AREA} maxWidth={'sm'} />
        </Box>
    )
}

export default AreaMng