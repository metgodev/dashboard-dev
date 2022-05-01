import React, { useState, useEffect } from 'react'
import client from '../../../../../API/metro';
import { ModalInit, FormTabs } from '../popConfig';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { useDispatch, useSelector } from 'react-redux';
import term from '../../../../../terms';
//styles
import FormBuilder from '../../../../FormBuilder/FormBuilder';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}


export let picker = {
    // if you want autocomplete use this format {id: '', title: ''}
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
    prefferedSeason: [
        { value: "SUMMER", name: term('summer') },
        { value: "WINTER", name: term('winter') },
        { value: "FALL", name: term('fall') },
        { value: "SPRING", name: term('spring') },
        { value: 'ALL_SEASONS', name: term('all_seasons') }
    ],
    arrivalRecommendations: [
        { value: "WALK", name: term('walk') },
        { value: "OFF_ROAD", name: term('off_road') },
        { value: "CAR", name: term('car') },
        { value: "BICYCLE", name: term('bicycle') },
    ],
    inPlace: [
        { id: "PICNIC_TABLES", title: term('picnic_tables') },
        { id: "BENCHES", title: term('benches') },
        { id: "TINS", title: term('tins') },
        { id: "BBQ_POSITIONS", title: term('bbq_positions') },
        { id: "TOILET", title: term('toilet') },
        { id: "DRINKING_FOUNTAIN", title: term('drinking_fountain') },
        { id: "PLAY_FACILITIES", title: term('play_facilities') },
        { id: "EXERCISE_MACHINES", title: term('exercise_machines') },
        { id: "DOG_GARDEN", title: term('dog_garden') },
        { id: "EXPLANATORY_BOARD", title: term('explanatory_board') },
        { id: "BUFFET", title: term('buffet') },
        { id: "CLOAKROOM", title: term('cloakroom') },
        { id: "BEACH_SHOWER", title: term('beach_shower') },
        { id: "FREE_PARKING", title: term('free_parking') },
        { id: "NEAT_PARKING", title: term('neat_parking') },
    ],
    shady: [
        { value: "FULL", name: term('full') },
        { value: "PARTIAL", name: term('partial') },
        { value: "NONE", name: term('none') }
    ],
    authorityId: [],
    categoriesIds: [],
    tagsIds: [],
};


export const PointsTab = ({ handleClose, type }) => {
    //global
    let dispatch = useDispatch();
    const { area } = useSelector(state => state.mainReducer)
    //local
    const initialState = {
        status: 'PENDING_APPROVAL',
        userId: user.id,
        areaId: area?.id?.toString(),
    }
    const [values, setValues] = useState(initialState);

    const handleChange = (e, field, tags) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (field === 'isAccessable') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

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

    useEffect(() => {
        (async () => {
            client.service("authorities").find({ query: { areaId: area.id } })
                .then((res) => res.data.map(({ name, _id }) => ({ value: _id, name })))
                .then((authorities => picker.authorityId = authorities))

            await client.service("categories").find().then((res) => {
                res?.data.map(({ title, _id }) => picker.categoriesIds = [...picker.categoriesIds, { value: _id, name: term(title.toLowerCase()) }])
            })

            await client.service('tag-categories').find({ query: { areaId: area.id } })
                .then(({ data }) => {
                    data.map((data) => picker.tagsIds =
                        [...picker.tagsIds, { title: data.tag.title + ' - ' + term(data.category.title.toLowerCase()), id: data.tag._id }])
                })
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
