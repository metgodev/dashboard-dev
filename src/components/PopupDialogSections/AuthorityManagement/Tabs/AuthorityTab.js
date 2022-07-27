import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ModalInit } from '../popConfig';
import Form from '../../../Form/Form'
import { validateForm } from './Validations'
import get_orientation from '../../../../utils/get_orientation'
import { GetFormData } from './HandleAuthorityData'
import client from '../../../../API/metro'
import { set_table_changed } from "../../../../REDUX/actions/main.actions";

export const AuthorityTab = ({ handleClose, type, }) => {
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
            ...formValues,
            areaId: area?.id?.toString()
        }

        if (type === 'add')
            client.service('authorities').create(valuesToSend)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('authorities').patch(values['_id'], valuesToSend)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <div>
            <Form
                fields={ModalInit}
                data={formData}
                options={[]}
                submitFunction={modify}
                validiationFunction={validateForm}
                orientation={orientation}
            />
        </div >
    )
}