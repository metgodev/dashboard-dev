import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalInit } from '../popConfig';
import Form from '../../../Form/Form'
import { validateForm } from './Validations'
import get_orientation from '../../../../utils/get_orientation'
import { GetFormData } from './HandleAreaTabData'
import client from '../../../../API/metro'
import { set_table_changed } from "../../../../REDUX/actions/main.actions";
import Toast from '../../../../utils/useToast';

export const AreaTab = ({ handleClose, type, }) => {
    //global

    const init = useSelector((s) => s.mainReducer.editTabData);
    const { lang, area } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')

    const formData = GetFormData(values)

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const modify = async (formValues) => {
        const valuesToSend = {
            name: formValues.name,
            location: {
                type: 'Point',
                coordinates: values.locationInfo ? values.locationInfo.coordinates : values.location ? values.location.coordinates : [0, 0]
            }
        }
        try {
            await client.service('area').patch(values._id, valuesToSend)
            dispatch(set_table_changed(type))
            handleClose(false)
        } catch (e) {
            console.log('areaTab', e)
            Toast()
        }
    }

    return (
        <Form
            fields={ModalInit}
            data={formData}
            options={[]}
            submitFunction={modify}
            validiationFunction={validateForm}
            orientation={orientation}
            setExternalValues={setValues}
        />
    )
}