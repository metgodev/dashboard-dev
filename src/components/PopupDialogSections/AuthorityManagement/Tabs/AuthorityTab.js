import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { ModalInit } from '../popConfig';
import Form from '../../../Form/Form'
import { validateForm } from './Validations'
import get_orientation from '../../../../utils/get_orientation'
import { GetFormData } from './HandleAuthorityData'


export const AuthorityTab = ({ handleClose, type, options }) => {
    //global

    const init = useSelector((s) => s.mainReducer.editTabData);
    const { lang } = useSelector((state) => state.mainRememberReducer);
    //local
    const [values, setValues] = useState({});
    const [orientation, setOrientation] = useState('ltr')

    const formData = GetFormData(values, options)

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init]);

    const modify = async (formValues) => {
        const areaId = options.areaId.find(item => item.name === formValues.areaId).value
        const valuesToSend = {
            ...formValues,
            areaId: areaId
        }


        // if (type === 'add')
        //     client.service('authorities').create(valuesToSend)
        //         .then(() => dispatch(set_table_changed(type)))
        //         .then(() => handleClose(false))
        // else
        //     client.service('authorities').patch(areaId, valuesToSend)
        //         .then(() => dispatch(set_table_changed(type)))
        //         .then(() => handleClose(false))
    }

    return (
        <div>
            {options !== null &&
                <Form
                    fields={ModalInit}
                    data={formData}
                    options={{ areaId: options.areaId.map(item => item.name) }}
                    submitFunction={modify}
                    validiationFunction={validateForm}
                    isPartOfStepper={false}
                    orientation={orientation}
                />
            }
        </div >
    )
}
