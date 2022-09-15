import React, { useEffect, useState } from 'react'
import { ModalInit } from '../popConfig'
import Form from '../../../Form/Form'
import get_orientation from '../../../../utils/get_orientation'
import { useSelector, useDispatch } from 'react-redux'
import { validate } from './Validations'
import client from '../../../../API/metro'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'
import term from "../../../../terms";
import Toast from '../../../../utils/useToast'

export const NewTagTab = ({ handleClose, type }) => {
    //global
    // const dispatch = useDispatch()
    const { area, lang, user } = useSelector(state => state.mainRememberReducer)
    const init = useSelector((s) => s.mainReducer.editTabData);
    const dispatch = useDispatch()
    // //local
    const [orientation, setOrientation] = useState('ltr')

    useEffect(() => {
        setOrientation(get_orientation(lang))
    }, [init]);

    const submit = async (values) => {

        const valuesToSend = {
            title: values.title,
            areaId: area?.id,
            userId: user?.id,
            categoryIds: ['61e94815f49adf4a20db7ca7']
        }
        try {
            await client.service("tags").create(valuesToSend)
            dispatch(set_table_changed(type))
            handleClose(false)
        } catch (e) {
            if (e.name === 'Conflict') {
                Toast(term('value_exists'))
                return
            }
            console.log('newTagTab', e)
            Toast()
        }
    }

    return (
        <Form
            fields={ModalInit}
            data={[]}
            options={[]}
            submitFunction={submit}
            validiationFunction={validate}
            orientation={orientation}
        />
    )
}