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
import toast from 'react-hot-toast';
import term from '../../../../terms';

function ModifyProductTab({ areaSpecificData, handleClose }) {

    let dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);

    const classes = useStyles()

    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')

    console.log(values)

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
            tagsIds: formValues.tagsIds,
        }
        try {
            await client.service(BACK_ROUTES.PRODUCTS).patch(values._id, valuesToSend)
            dispatch(set_table_changed('changed'))
            handleClose(false)
        } catch (e) {
            console.log(e)
            errorToast()
        }
    }

    const errorToast = () => toast(term("something_went_wrong"));

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