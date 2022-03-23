import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { LinkingModalInit, picker, categories } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const TagLinkPop = ({ handleClose, type }) => {
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
        if (type === 'add')
            await client.service('tag-categories').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            await client.service('tag-categories').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }


    return (
        <FormBuilder
            ModalInit={LinkingModalInit}
            picker={picker}
            tags={categories}
            handleChange={handleChange}
            values={values}
            modify={modify}
            type={type}
        />
    )
}