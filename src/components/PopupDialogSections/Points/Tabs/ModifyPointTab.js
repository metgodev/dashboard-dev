import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ModalInit } from '../popConfig'
import { initialState, GetFormFields } from './HandlePointsData'
import { validateFirstFormPart, validateSecondFormPart, validateThirdFormPart } from './Validations'
import useStyles from './styles'
import get_orientation from '../../../../utils/get_orientation'
import { Box } from '@mui/material'
import Stepper from '../../../Stepper/Stepper'
import client from '../../../../API/metro'
import { set_table_changed } from "../../../../REDUX/actions/main.actions";
import { GetValuesForForm } from '../../CategoryConfig'
import term from "../../../../terms";
import Toast from '../../../../utils/useToast'
import GetPermissions from '../../../../hooks/GetPermissions'

const ModifyPointTab = ({ type, areaSpecificData, handleClose }) => {
    //global
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')

    const formData = GetValuesForForm(values, areaSpecificData.tagsIds)
    const permissions = GetPermissions()

    useEffect(() => {
        setValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init]);

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues, websitesUrl: [formValues.websitesUrl] }))
        setStep(prev => prev + 1)
    }

    const submitValues = async () => {

        const configurationValues = initialState(area, user)

        const valuesToSend = {
            areaId: configurationValues.areaId,
            userId: configurationValues.userId,
            status: configurationValues.status,
            authorityId: values.authorityId,
            name: values.name,
            address: values.address,
            locationInfo: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            location: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            locationName: values.locationName,
            isAccessable: values.isAccessable,
            description: values.description,
            exclusiveFor: typeof values.exclusiveFor === 'string' ? [values.exclusiveFor] : values.exclusiveFor[0],
            shady: values.shady,
            arrivalRecommendations: values.arrivalRecommendations,
            phoneNumber: values.phoneNumber,
            websitesUrl: typeof values.websitesUrl === 'string' ? [values.websitesUrl] : values.websitesUrl,
            contactEmail: values.contactEmail,
            tagsIds: values.tags.map(tag => tag.value),
            shortDescription: values.shortDescription,
            inPlace: values.inPlace.map(tag => tag.value),
            tip: values.tip,
            relevantTo: values.relevantTo.map(tag => tag.value),
            activitiesInPlace: values.activitiesInPlace,
            prefferedSeason: typeof values.prefferedSeason === 'object' ? values.prefferedSeason : [values.prefferedSeason],
        }
        try {
            if (permissions.edit) {
                if (type === "add") {
                    await client.service("pois").create(valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
                else {
                    await client.service("pois").patch(values['_id'], valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
            } else {
                Toast(term('you_dont_have_permission'))
            }
        } catch (e) {
            console.log('modifyPointTab', e)
            Toast()
        }
    }

    let formFields = GetFormFields(ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSecondFormPart, orientation, setValues)

    return (
        <Box className={classes.container}>
            <Stepper
                fields={formFields}
                submitFunction={submitValues}
                externalActiveStep={step}
                setExternalActiveStep={setStep}
                orientation={orientation}
            />
        </Box>
    )
}

export default ModifyPointTab