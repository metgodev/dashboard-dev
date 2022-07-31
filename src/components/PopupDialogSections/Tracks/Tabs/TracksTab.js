import React, { useEffect, useState } from 'react'
import { ModalInit } from '../popConfig'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import useStyles from './styles'
import { validateForm } from './Validations'
import { GetValuesForForm } from '../../CategoryConfig'
import get_orientation from '../../../../utils/get_orientation'
import Form from '../../../Form/Form'
import client from '../../../../API/metro'
import { set_table_changed } from "../../../../REDUX/actions/main.actions";

export const TracksTab = ({ handleClose, type, areaSpecificData }) => {
    //global
    let dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { lang } = useSelector((state) => state.mainRememberReducer);
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const formData = GetValuesForForm(values)

    const submit = async (formValues) => {
        try {
            if (type === "add") {
                await client.service("tracks").create(formValues)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
            else {
                await client.service("tracks").patch(values['_id'], formValues)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box className={classes.container}>
            <Form
                fields={ModalInit}
                data={formData}
                options={areaSpecificData}
                submitFunction={submit}
                validiationFunction={validateForm}
                orientation={orientation}
            />
        </Box>
    )
}
