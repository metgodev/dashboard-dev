import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, TimePicker, FormTabs } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';
import term from '../../../../../terms';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

let picker = {
    tagsIds: [],
    relevantTo: [
        { id: 'INFANCY', title: term('infancy') },
        { id: 'KIDS', title: term('kids') },
        { id: 'YOUTH', title: term('youth') },
        { id: 'ALL_FAMILY', title: term('all_family') },
        { id: 'YOUNG_ADULTS', title: term('young_adults') },
        { id: 'ADULTS', title: term('adults') },
        { id: 'FAMALIES', title: term('families') },
        { id: 'GOLDEN_AGE', title: term('golden_age') },
        { id: 'WOMEN_ONLY', title: term('women_only') },
        { id: 'MEN_ONLY', title: term('men_only') },
    ],
    reservations: [
        { value: 'FREE', name: term('free') },
        { value: 'FREE_WITH_RESERVATION', name: term('free_with_reservation') },
        { value: 'PAYMENT', name: term('payment') },
        { value: 'PAYMENT_WITH_RESERVATION', name: term('payment_with_reservation') },
        { value: 'ON_PLACE', name: term('on_place') },
    ],
    authorityId: []
};


export const ModifyTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    const { area } = useSelector(state => state.mainReducer)
    //local

    const openDrop = () => setOpen(!open);
    const [checked, setChecked] = useState([]);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        status: 'PENDING_APPROVAL',
        areaId: area?.id?.toString(),
        userId: user.id,
        openingHours: {
            sunday: {},
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
        },
    });

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
        console.log(values)
        if (type === 'add')
            client.service('business').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('business').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    useEffect(() => {
        (async () => {
            await client.service("authorities").find({ query: { areaId: area.id } })
                .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
                .then((authorities => picker.authorityId = authorities))

            await client.service('area').find({ query: { _id: area.id } })
                .then(({ data }) => data[0].tags.map(({ title, _id }) => picker.tagsIds = [...picker.tagsIds, { title, id: _id }]));
        })()
    }, [area])

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            setFatherValue={setValues}
            handleChange={handleChange}
            FormTabs={FormTabs}
            ModalInit={ModalInit}
            maxSizeElements={maxSizeElements}
            setValues={setValues}
            values={values}
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
