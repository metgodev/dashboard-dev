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
import Toast from '../../../../utils/useToast';
import term from '../../../../terms';
import GetPermissions from '../../../../hooks/GetPermissions';

export const TracksTab = ({ handleClose, type, areaSpecificData }) => {
    //global
    let dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')
    const permissions = GetPermissions()

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const formData = GetValuesForForm(values)

    const submit = async (formValues) => {
        let valuesToSend = {
            areaId: area?.id?.toString(),
            userId: user.id,
            status: "PENDING_APPROVAL",
            name: formValues.name,
            time: formValues.time,
            description: formValues.description,
            objectIds: formValues.objectIds,
            coverImageFileId: formValues.coverImageFileId,
            isHidden: formValues.isHidden,
            isRecommended: formValues.isRecommended,
            shortDescription: formValues.shortDescription
        }
        try {
            if (permissions.edit) {
                if (type === "add") {
                    await client.service("tracks").create(valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
                else {
                    await client.service("tracks").patch(values['_id'], valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
            } else {
                Toast(term('you_dont_have_permission'))
            }
        } catch (e) {
            console.log('tracksTab', e)
            Toast()
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
