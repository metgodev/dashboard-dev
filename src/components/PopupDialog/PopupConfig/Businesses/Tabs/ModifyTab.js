import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker, TimePicker, clearButtonId, FormTabs } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const ModifyTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const stateInit = {
        userId: user.id,
        openingHours: {
            sunday: {},
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
        }
    }
    const openDrop = () => setOpen(!open);
    const [checked, setChecked] = useState([]);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(stateInit);

    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    //set the time
    const setTimes = (times, field, type) => {
        let pos = type === 1 ? 'start' : 'end'
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [field]: { ...prevState.openingHours[field], [pos]: times } } }))
    };
    const removeDay = (timeRef, e) => {
        if (e.target.checked) return;
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [timeRef]: { start: null, end: null } } }))
    }

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('business').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('business').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }


    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            handleChange={handleChange}
            FormTabs={FormTabs}
            ModalInit={ModalInit}
            maxSizeElements={maxSizeElements}
            setValues={setValues}
            values={values}
            tags={tags}
            picker={picker}
            TimePicker={TimePicker}
            openDrop={openDrop}
            checked={checked}
            setChecked={setChecked}
            open={open}
            setTimes={setTimes}
            removeDay={removeDay}
            modify={modify}
            type={type}
        />
    )
}
