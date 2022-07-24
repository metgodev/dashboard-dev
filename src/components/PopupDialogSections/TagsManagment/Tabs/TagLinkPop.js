import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import client from '../../../../API/metro';
import { LinkingModalInit } from '../popConfig';
import { set_table_changed } from '../../../../REDUX/actions/main.actions';
import term from '../../../../terms';
import { ModalInit } from '../popConfig'
import Form from '../../../Form/Form'
let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

let picker = {
    tagId: [],
    categoryId: [],
};

export const TagLinkPop = ({ handleClose, type }) => {
    //global
    const dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, tableChanged } = useSelector(state => state.mainRememberReducer)

    // const initialState = {
    //     areaId: area?.id?.toString(),
    //     userId: user.id,
    // }

    //local
    const [values, setValues] = useState();

    useEffect(() => {
        console.log(init)
    }, [init])

    //set the values
    // const handleChange = (e, field, tags, type) => {
    //     if (tags) setValues(prevState => ({ ...prevState, [field]: tags.id }))
    //     else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
    //     else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    // };

    // const modify = async (type, id) => {
    //     if (type === 'link') {
    //         client.service('tag-categories').find({ query: { tagId: values.tagId, categoryId: values.categoryId } })
    //             .then(({ data }) => {
    //                 if (data.length > 0) {
    //                     client.service('tag-categories').patch(data[0]._id, values)
    //                         .then(() => dispatch(set_table_changed(type)))
    //                         .then(() => handleClose(false))
    //                 } else {
    //                     client.service('tag-categories').create(values)
    //                         .then(() => dispatch(set_table_changed(type)))
    //                         .then(() => handleClose(false))
    //                 }
    //             })
    //     } else {
    //         client.service('tag-categories').patch(id, values)
    //             .then(() => dispatch(set_table_changed(type)))
    //             .then(() => handleClose(false))
    //     }
    // }

    // useEffect(() => {
    //     picker = {
    //         tagId: [],
    //         categoryId: [],
    //     };
    //     (async () => {
    //         await client.service("categories").find().then(({ data }) => {
    //             data.map(({ title, _id }) => picker.categoryId = [...picker.categoryId, { value: _id, name: term(title.toLowerCase()) }])
    //         })
    //         await client.service("tags").find().then(({ data }) => {
    //             data.map(({ title, _id }) => picker.tagId = [...picker.tagId, { title, id: _id }])
    //         })
    //     })();
    // }, [tableChanged])

    return (
        // <Form
        //     fields={ModalInit}
        //     data={formData}
        //     options={{ areaId: options.areaId.map(item => item.name) }}
        //     submitFunction={modify}
        //     validiationFunction={validateForm}
        //     isPartOfStepper={false}
        //     orientation={orientation}
        // />
        <></>
    )
}
