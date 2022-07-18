import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stepper from '../../../../Stepper/Stepper'
import useStyles from './styles'
import get_orientation from '../../../../../utils/get_orientation'
import term from '../../../../../terms'
import { ModalInit } from '../popConfig'
import Form from "../../../../Form/Form";
import { initialState, GetValuesToSendFirstPart, GetValuesToSendSecondPart, GetValuesToSendThirdPart } from './HandleEventsData'
import { validateFirstFormPart, validateSecondFormPart, validateThirdFormPart } from './Validations'
import { set_table_changed } from '../../../../../REDUX/actions/main.actions'
import client from '../../../../../API/metro'

export const ModifyEventsTab = ({ type, areaSpecificData, handleClose }) => {

    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')
    const [values, setValues] = useState({});

    const classes = useStyles()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()


    const firstFormData = GetValuesToSendFirstPart(values, areaSpecificData.tagsIds)
    const secondFormData = GetValuesToSendSecondPart(values)
    const thirdFormData = GetValuesToSendThirdPart(values)

    useEffect(() => {
        setValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init])

    const getTagIdsToSend = (tagCategoryIds) => {
        let x = areaSpecificData.tagsIds.filter(item => tagCategoryIds.includes(item.id))
        x = x.map(item => {
            return item.idToSend
        })
        return x
    }

    const submitValues = () => {
        const configurationValues = initialState(area, user)

        const valuesToSend = {
            areaId: configurationValues.areaId,
            userId: configurationValues.userId,
            status: configurationValues.status,
            name: values.name,
            online: values.online,
            isAccessable: values.isAccessable,
            free: values.free,
            authorityId: values.authorityId,
            address: values.address,
            startDate: values.startDate,
            description: values.description,
            shortDescription: values.shortDescription,
            endDate: values.endDate,
            tagsIds: getTagIdsToSend(values.tagsIds),
            openHour: values.openHour,
            relevantTo: values.relevantTo,
            price: values.price,
            currency: configurationValues.currency,
            reservationCenterPhone: values.reservationCenterPhone,
            reservationCenterEmail: values.reservationCenterEmail,
            onlineMeetingURL: values.onlineMeetingURL,
            reservations: [values.reservations],
            websitesUrl: values.websitesUrl,
            registrationLink: values.registrationLink
        }

        if (type === "add")
            client
                .service("events")
                .create(valuesToSend)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
                .catch(e => console.log(e))
        else
            client
                .service("events")
                .patch(values['_id'], valuesToSend)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
                .catch(e => console.log(e))
    }

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues }))
        setStep(prev => prev + 1)
    }

    let formFields =
        [
            {
                title: term("event_details"),
                optional: false,
                field:
                    <Form
                        fields={ModalInit.slice(0, 15)}
                        data={firstFormData}
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateFirstFormPart}
                        isPartOfStepper={true}
                        orientation={orientation}
                        setExternalValues={setValues}
                    />
            },
            {
                title: term('contact_information'),
                optional: false,
                field:
                    < Form
                        fields={ModalInit.slice(15, 19)}
                        data={secondFormData}
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateSecondFormPart}
                        isPartOfStepper={true}
                        orientation={orientation}
                        setExternalValues={setValues}
                    />,
            },
            {
                title: term('location'),
                optional: false,
                field:
                    < Form
                        fields={ModalInit.slice(19)}
                        data={thirdFormData}
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateThirdFormPart}
                        isPartOfStepper={true}
                        orientation={orientation}
                        setExternalValues={setValues}
                    />,
            }
        ]

    return (
        <Box className={classes.container}>
            {formFields && Object.keys(areaSpecificData).length &&
                < Stepper
                    fields={formFields}
                    submitFunction={submitValues}
                    externalActiveStep={step}
                    setExternalActiveStep={setStep}
                    orientation={orientation}
                    setExternalValues={setValues}
                />}
        </Box>
    )
}