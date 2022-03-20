import React, { useState, useEffect } from 'react'
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { useDispatch } from 'react-redux';
//styles
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const PointsTab = ({ handleClose, initialData, type }) => {
    //global
    let dispatch = useDispatch();
    //local
    let status = type === 'edit' ? initialData.status : 'PENDING_APPROVAL'
    const [init, setInit] = useState({});
    const [values, setValues] = useState({
        status: status,
        userId: user.id,
        addressType: "FREE_TEXT", //  ["WEBSITE_URL", "FREE_TEXT"] 
        relevantTo: "GOLDEN_AGE",
        prefferedSeason: "SUMMER",
        shady: "FULL",
    });

    const handleChange = (e, field, tags) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (field === 'isAccessable') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => setInit({}))
    }, [type])

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('pois').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('pois').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            init={initialData}
            ModalInit={ModalInit}
            handleClose={handleClose}
            values={values}
            modify={modify}
            picker={picker}
            tags={tags}
            type={type}
            handleChange={handleChange}
            maxSizeElements={maxSizeElements}
        />
    )
}
