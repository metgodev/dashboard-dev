import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import client from '../../../../../API/metro';
import { ModalInit } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';
import term from '../../../../../terms';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}
let picker = {
    tagId: [],
    categoryId: [],
};

export const TagsTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const initialState = { userId: user.id }
    const [values, setValues] = useState(initialState);

    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle' || type === 'checkbox') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
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

    useEffect(() => {
        (async () => {
            await client.service("categories").find().then(({ data }) => {
                data.map(({ title, _id }) => picker.categoryId = [...picker.categoryId, { value: _id, name: term(title.toLowerCase()) }])
            })
            await client.service("tags").find().then(({ data }) => {
                data.map(({ title, _id }) => picker.tagId = [...picker.tagId, { title, id: _id }])
            })
        })();
    }, [])

    return (
        <FormBuilder
            setFatherValue={setValues}
            ModalInit={ModalInit}
            picker={picker}
            handleChange={handleChange}
            values={values}
            modify={modify}
            presistableFileds={initialState}
            type={type}
            handleClose={handleClose}
        />
    )
}