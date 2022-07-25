import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Stepper from '../../../Stepper/Stepper'
import useStyles from './styles'
import get_orientation from '../../../../utils/get_orientation'
import { ModalInit } from '../popConfig'
import { initialState, GetFormFields } from './HandleEventsData'
import { validateFirstFormPart, validateSecondFormPart, validateThirdFormPart } from './Validations'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'
import client from '../../../../API/metro'
import { GetValuesForForm, getTagIdsToSend } from '../../CategoryConfig'

export const ModifyEventsTab = ({ type, areaSpecificData, handleClose }) => {

    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')
    const [values, setValues] = useState({});

    const classes = useStyles()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()


    const formData = GetValuesForForm(values, areaSpecificData.tagsIds)

    useEffect(() => {
        setValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init])

    const submitValues = async () => {
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
            address: values.locationName,
            startDate: values.startDate,
            description: values.description,
            shortDescription: values.shortDescription,
            endDate: values.endDate,
            tagsIds: getTagIdsToSend(values.tagsIds, areaSpecificData),
            locationInfo: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            openHour: getFormattedHour(values.openHour),
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
        try {
            if (type === "add") {
                await client.service("events").create(valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
            else {
                await client.service("events").patch(values['_id'], valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const getFormattedHour = (hour) => {
        const date = new Date(hour)
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (hours < 10) {
            hours = "0" + hours
        }
        if (minutes < 10) {
            minutes = "0" + minutes
        }
        return `${hours}:${minutes}`
    }

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues }))
        setStep(prev => prev + 1)
    }

    let formFields = GetFormFields(ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSecondFormPart, orientation, setValues)

    return (
        <Box className={classes.container}>
            < Stepper
                fields={formFields}
                submitFunction={submitValues}
                externalActiveStep={step}
                setExternalActiveStep={setStep}
                orientation={orientation}
                setExternalValues={setValues}
            />
        </Box>
    )
}