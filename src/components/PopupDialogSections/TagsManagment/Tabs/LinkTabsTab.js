import React, { useEffect, useState } from 'react'
import { LinkingModalInit } from '../popConfig'
import Form from '../../../Form/Form'
import get_orientation from '../../../../utils/get_orientation'
import { useSelector, useDispatch } from 'react-redux'
import { validate } from './Validations'
import client from '../../../../API/metro'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'
import { GetValuesForForm } from "../../CategoryConfig";

export const LinkTabsTab = ({ handleClose, type, areaSpecificData }) => {
    //global
    // const dispatch = useDispatch()
    const { area, lang, user } = useSelector(state => state.mainRememberReducer)
    const init = useSelector((s) => s.mainReducer.editTabData);
    const dispatch = useDispatch()
    // //local
    const [orientation, setOrientation] = useState('ltr')
    const [values, setValues] = useState({})

    const formData = GetValuesForForm(values, areaSpecificData)

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const submit = async (formValues) => {

        const valuesToSend = {
            areaId: area?.id,
            tagId: formValues.tagId,
            categoryId: formValues.categoryId,
            userId: user?.id,
        }

        try {
            if (type === "link") {
                await client.service("tag-categories").create(valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
            else {
                await client.service("tag-categories").patch(values['_id'], valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Form
            fields={LinkingModalInit}
            data={formData}
            options={areaSpecificData}
            submitFunction={submit}
            validiationFunction={validate}
            orientation={orientation}
        />
    )
}