import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import client from '../../../../../API/metro';
import { ModalInit } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

export let picker = {
    areaId: []
};

export const AuthorityTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({});
    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    useEffect(() => {
        (async () => {
            client.service("area").find().then((res) => {
                res?.data.map(({ name, _id }) => picker.areaId = [...picker.areaId, { value: _id, name }])
            })
        })();
    }, []);

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('authorities').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('authorities').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <FormBuilder
            presistableFileds={{}}
            setFatherValue={setValues}
            ModalInit={ModalInit}
            picker={picker}
            handleChange={handleChange}
            values={values}
            modify={modify}
            type={type}
            handleClose={handleClose}
        />
    )
}
