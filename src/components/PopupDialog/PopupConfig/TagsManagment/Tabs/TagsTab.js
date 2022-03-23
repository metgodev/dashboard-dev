import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, picker, categories } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const TagsTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({
        userId: user.id,
    });

    //set the values
    const handleChange = (e, field, categories, type) => {
        if (categories) setValues(prevState => ({ ...prevState, [field]: Object.keys(categories).map(key => categories[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        let area_id = localStorage.getItem('aid')
        if (type === 'add')
            await client.service('tags').create(values)
                .then(({ _id }) => client.service('area').patch(area_id, { $push: { tagsIds: _id } }))
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            await client.service('tags').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <FormBuilder
            ModalInit={ModalInit}
            picker={picker}
            tags={categories}
            handleChange={handleChange}
            values={values}
            modify={modify}
            type={type}
        />
    )
}