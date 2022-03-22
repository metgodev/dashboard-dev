import React, { useState } from 'react'
import { ModalInit, picker, FormTabs } from '../popConfig';
import { client } from '../../../../../API/metro';
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const TracksTab = ({ handleClose, type }) => {
    //global
    let dispatch = useDispatch()
    //local
    const [values, setValues] = useState({
        userId: user.id,
        relevantTo: "GOLDEN_AGE"
    });

    const handleChange = (e, field) => {
        if (field === 'featured') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('tracks').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('tracks').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            FormTabs={FormTabs}
            ModalInit={ModalInit}
            handleClose={handleClose}
            values={values}
            modify={modify}
            picker={picker}
            type={type}
            handleChange={handleChange}
            maxSizeElements={maxSizeElements}
        />
    )
}
