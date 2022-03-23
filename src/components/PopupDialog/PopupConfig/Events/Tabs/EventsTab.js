import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker, FormTabs } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const EventsTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({
        userId: user.id,
    });

    const handleChange = (e, field, tagsIds) => {
        if (tagsIds) setValues(prevState => ({ ...prevState, [field]: Object.keys(tagsIds).map(key => tagsIds[key].id) }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const setDateTime = (time, field) => setValues(prevState => ({ ...prevState, [field]: new Date(time) }));

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('events').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('events').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            FormTabs={FormTabs}
            ModalInit={ModalInit}
            tags={tags}
            picker={picker}
            maxSizeElements={maxSizeElements}
            handleChange={handleChange}
            setDateTime={setDateTime}
            values={values}
            modify={modify}
            type={type}
        />
    )
}
