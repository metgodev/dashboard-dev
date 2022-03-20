import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker, clearButtonId } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const EventsTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    let status = type === 'edit' ? initialData.status : 'PENDING_APPROVAL'
    const [init, setInit] = useState({});
    const [values, setValues] = useState({
        userId: user.id,
        status: status,
    });

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => clear())
    }, [type])

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

    const clear = () => {
        let clearButton = document.querySelector(clearButtonId);
        if (clearButton) clearButton.click();
        setInit({});
    }

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            ModalInit={ModalInit}
            tags={tags}
            picker={picker}
            maxSizeElements={maxSizeElements}
            handleChange={handleChange}
            setDateTime={setDateTime}
            values={values}
            init={init}
            modify={modify}
            type={type}
        />
    )
}
