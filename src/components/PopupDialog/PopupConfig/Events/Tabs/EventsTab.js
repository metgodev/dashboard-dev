import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, FormTabs } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import FormBuilder from '../../../../FormBuilder/FormBuilder';
import term from '../../../../../terms';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

let picker = {
    tags: [],
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
    authorityId: [],
    relatedBusinessId: [],
    currency: [{ value: 'ILS', name: 'ILS' },
    { value: 'USD', name: 'USD' },
    { value: 'EUR', name: 'EUR' }]
};

export const EventsTab = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    const { area } = useSelector(state => state.mainReducer)
    //local
    const [values, setValues] = useState({
        status: 'PENDING_APPROVAL',
        areaId: area?.id?.toString(),
        userId: user.id,
    });

    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
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

    useEffect(() => {
        (async () => {
            await client.service("authorities").find({ query: { areaId: area.id } })
                .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
                .then((authorities => picker.authorityId = authorities))

            await client.service('area').find({ query: { _id: area.id } })
                .then(({ data }) => data[0].tags.map(({ title, _id }) => picker.tags = [...picker.tags, { title, id: _id }]));

            await client.service('business').find({ query: { areaId: area.id } })
                .then(({ data }) => data.map(({ name, _id }) => {
                    if (!picker.relatedBusinessId.find(({ id }) => id === _id) && area.id === data[0].areaId)
                        picker.relatedBusinessId = [...picker.relatedBusinessId, { title: name, id: _id }]
                }))
        })();
    }, [area.id])

    let maxSizeElements = ['MapPicker']
    return (
        <FormBuilder
            setFatherValue={setValues}
            FormTabs={FormTabs}
            ModalInit={ModalInit}
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
