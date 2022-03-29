import React, { useEffect, useState } from 'react'
import { ModalInit, FormTabs } from '../popConfig';
import client from '../../../../../API/metro';
import { useDispatch, useSelector } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';
import term from '../../../../../terms';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}
const picker = {
    relevantTo: [
        { value: 'INFANCY', name: term('infancy') },
        { value: 'KIDS', name: term('kids') },
        { value: 'YOUTH', name: term('youth') },
        { value: 'ALL_FAMILY', name: term('all_family') },
        { value: 'YOUNG_ADULTS', name: term('young_adults') },
        { value: 'ADULTS', name: term('adults') },
        { value: 'FAMALIES', name: term('families') },
        { value: 'GOLDEN_AGE', name: term('golden_age') },
        { value: 'WOMEN_ONLY', name: term('women_only') },
        { value: 'MEN_ONLY', name: term('men_only') },
    ],
    authorityId: [],
    pois: [{ value: 'something', name: 'something' }]
};

export const TracksTab = ({ handleClose, type }) => {
    //global
    let dispatch = useDispatch()
    const { area } = useSelector(state => state.mainReducer)
    //local
    const initialState = {
        userId: user.id,
        relevantTo: "GOLDEN_AGE"
    }
    const [values, setValues] = useState(initialState);

    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
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

    useEffect(() => {
        (async () => {
            client.service("authorities").find({ query: { areaId: area.id } })
                .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
                .then((authorities => picker.authorityId = authorities))
        })();
    }, [area])

    let maxSizeElements = ['MapPicker', 'divider']
    return (
        <FormBuilder
            setFatherValue={setValues}
            FormTabs={FormTabs}
            ModalInit={ModalInit}
            handleClose={handleClose}
            values={values}
            modify={modify}
            picker={picker}
            type={type}
            handleChange={handleChange}
            maxSizeElements={maxSizeElements}
            presistableFileds={initialState}
        />
    )
}
