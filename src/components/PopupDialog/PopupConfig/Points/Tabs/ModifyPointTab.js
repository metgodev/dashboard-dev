import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Form from '../../../../Form/Form'
import { ModalInit } from '../popConfig'
import { GetValuesToSendFirstPart, GetValuesToSendSecondPart, GetValuesToSendThirdPart, initialState } from './HandlePointsData'
import { validateFirstFormPart, validateSecondFormPart, validateThirdFormPart } from './Validations'
import useStyles from './styles'
import get_orientation from '../../../../../utils/get_orientation'
import term from '../../../../../terms'
import { Box } from '@mui/material'
import Stepper from '../../../../Stepper/Stepper'
import client from '../../../../../API/metro'
import { set_table_changed } from "../../../../../REDUX/actions/main.actions";

function ModifyPointTab({ type, areaSpecificData, handleClose }) {
    //global
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    const dispatch = useDispatch()
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')

    const firstFormData = GetValuesToSendFirstPart(values, areaSpecificData.tagsIds)
    const secondFormData = GetValuesToSendSecondPart(values)
    const thirdFormData = GetValuesToSendThirdPart(values)

    useEffect(() => {
        setValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init]);

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues }))
        setStep(prev => prev + 1)
    }

    let formFields =
        [
            {
                title: term("business_details"),
                optional: false,
                field:
                    <Form
                        fields={ModalInit.slice(0, 14)}
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
                        fields={ModalInit.slice(14, 17)}
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
                        fields={ModalInit.slice(17)}
                        data={thirdFormData} //Send the data in the correct format
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateThirdFormPart}
                        isPartOfStepper={true}
                        orientation={orientation}
                        setExternalValues={setValues}
                    />,
            }
        ]

    const getTagIdsToSend = (tagCategoryIds) => {
        let x = areaSpecificData.tagsIds.filter(item => tagCategoryIds.includes(item.id))
        x = x.map(item => {
            return item.idToSend
        })
        return x
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
            locationInfo: values.locationInfo,
            locationName: values.address,
            isAccessable: values.isAccessable,
            description: values.description,
            exclusiveFor: typeof values.exclusiveFor === 'string' ? [values.exclusiveFor] : values.exclusiveFor[0],
            shady: values.shady,
            arrivalRecommendations: values.arrivalRecommendations,
            phoneNumber: values.phoneNumber,
            websitesUrl: typeof values.websitesUrl === 'string' ? [values.websitesUrl] : values.websitesUrl,
            contactEmail: values.contactEmail,
            tagsIds: getTagIdsToSend(values.tagsIds),
            shortDescription: values.shortDescription,
            inPlace: values.inPlace,
            tip: values.tip,
            relevantTo: values.relevantTo,
            activitiesInPlace: values.activitiesInPlace,
            prefferedSeason: [values.prefferedSeason],
        }
        try {
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
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Box className={classes.container}>
            {formFields &&
                <Stepper
                    fields={formFields}
                    submitFunction={submitValues}
                    externalActiveStep={step}
                    setExternalActiveStep={setStep}
                    orientation={orientation}
                />}
        </Box>
    )
}

export default ModifyPointTab