import React, { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import get_orientation from '../../../../utils/get_orientation';
import { ModalInit } from '../PopConfig'
import useStyles from '../../styles'
import Form from '../../../Form/Form'
import { GetValuesForForm } from '../../CategoryConfig';
import { validate } from './Validations'
import client from '../../../../API/metro'
import { set_table_changed } from '../../../../REDUX/actions/main.actions';
import BACK_ROUTES from '../../../../data/back_routes';
import Toast from '../../../../utils/useToast';
import term from '../../../../terms';
import GetPermissions from '../../../../hooks/GetPermissions';

function ModifyProductTab({ areaSpecificData, handleClose }) {

    let dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const permissions = GetPermissions()

    const classes = useStyles()

    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const formData = GetValuesForForm(values, areaSpecificData.tagsIds)

    const submit = async (formValues) => {

        const valuesToSend = {
            areaId: area?.id?.toString(),
            userId: user.id,
            status: "PENDING_APPROVAL",
            businessId: values.businessId,
            name: formValues.name,
            productIncludes: formValues.productIncludes,
            productComponents: formValues.productComponents,
            description: formValues.description,
            shipmentType: formValues.shipmentType,
            sizeAndDimension: formValues.sizeAndDimension,
            style: formValues.style,
            useageRestrictions: formValues.useageRestrictions,
            inStock: formValues.inStock,
            price: formValues.price,
            galleryFileIds: formValues.galleryFileIds,
            tagsIds: formValues.tags.map(tag => tag.value),
        }
        try {
            if (permissions.edit) {
                await client.service(BACK_ROUTES.PRODUCTS).patch(values._id, valuesToSend)
                dispatch(set_table_changed('changed'))
                handleClose(false)
            } else {
                Toast(term('you_dont_have_permission'))
            }
        } catch (e) {
            console.log(e)
            Toast()
        }
    }

    return (
        <Box className={classes.container}>
            {Object.keys(values).length > 0 && <Form
                fields={ModalInit}
                data={formData}
                options={areaSpecificData}
                submitFunction={submit}
                validiationFunction={validate}
                orientation={orientation}
            />}
        </Box>
    )
}

export default ModifyProductTab