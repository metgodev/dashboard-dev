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
import { GetValuesForForm } from '../../CategoryConfig'
import Toast from '../../../../utils/useToast'
import ROLES from '../../../../data/roles'
import { set_user_details } from '../../../../REDUX/actions/user.actions'
import GetPermissions from '../../../../hooks/GetPermissions'
import term from '../../../../terms'

export const ModifyEventsTab = ({ type, areaSpecificData, handleClose }) => {

    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')
    const [values, setValues] = useState({});

    const classes = useStyles()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()
    const permissions = GetPermissions()

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
            address: values.address,
            locationName: values.locationName,
            startDate: values.startDate,
            description: values.description,
            shortDescription: values.shortDescription,
            endDate: values.endDate,
            tagsIds: values.tags.map(tag => tag.value),
            locationInfo: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            location: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            openHour: getFormattedHour(values.openHour),
            relevantTo: values.relevantTo.map(tag => tag.value),
            price: values.price,
            currency: configurationValues.currency,
            reservationCenterPhone: values.reservationCenterPhone,
            reservationCenterEmail: values.reservationCenterEmail,
            onlineMeetingURL: values.onlineMeetingURL,
            reservations: [values.reservations],
            websitesUrl: [values.websitesUrl],
            registrationLink: values.registrationLink
        }
        try {
            if (permissions.edit) {
                if (type === "add") {
                    const userBusinessRole = await client.service('user-roles').find({ query: { userId: user.id, roleId: ROLES.BUSINESS_ROLE_ID } })
                    if (userBusinessRole.data.length === 1) {
                        const roleId = userBusinessRole.data[0]._id
                        const eventsRes = await client.service("events").create(valuesToSend)
                        await client.service('user-roles').patch(roleId, { resourceIds: [...userBusinessRole.data[0].resourceIds, eventsRes._id] })
                        const newUserDetails = await client.service('users').find({ query: { _id: user.id } })
                        dispatch(set_user_details(newUserDetails.data[0]))
                        dispatch(set_table_changed(type))
                    } else {
                        await client.service("events").create(valuesToSend)
                        dispatch(set_table_changed(type))
                        Toast()
                    }
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
                else {
                    await client.service("events").patch(values['_id'], valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
            }
            else {
                Toast(term('you_dont_have_permission'))
            }
        } catch (e) {
            console.log('modifyEventTab', e)
            Toast()
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