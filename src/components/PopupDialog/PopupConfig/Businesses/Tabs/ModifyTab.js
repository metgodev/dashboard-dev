import React, { useEffect, useState } from "react";
import useStyles from './styles'
import { Box } from "@mui/material";
import term from "../../../../../terms";
import { ModalInit } from "../popConfig";
import Form from "../../../../Form/Form";
import { useSelector } from "react-redux";
import client from "../../../../../API/metro";
import Stepper from '../../../../Stepper/Stepper'
import { useDispatch } from "react-redux";
import get_orientation from '../../../../../utils/get_orientation'
import { set_table_changed } from "../../../../../REDUX/actions/main.actions";
import { validateFirstFormPart, validateSeconsFormPart, validateThirdFormPart } from './Validations'
import { initialState } from './HandleBusinessData'
import { GetValuesForForm, getTagIdsToSend } from "../../CategoryConfig";

export const ModifyTab = React.memo(({ type, areaSpecificData, handleClose }) => {
    //global
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((s) => s.mainRememberReducer);
    const dispatch = useDispatch()
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')

    const formData = GetValuesForForm(values, areaSpecificData.tagsIds)

    useEffect(() => {
        handleSetValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init]);

    const handleSetValues = (init) => setValues(init);

    const submitValues = async () => {

        const configurationValues = initialState(area, user)

        const valuesToSend = {
            name: values.name,
            tagsIds: getTagIdsToSend(values.tagsIds, areaSpecificData),
            description: values.description,
            authorityId: values.authorityId,
            address: values.locationName,
            locationName: values.name,
            phoneNumber: values.phoneNumber,
            contactPersonName: values.contactPersonName,
            contactPersonPhoneNumber: values.contactPersonPhoneNumber,
            websitesUrl: values.websitesUrl,
            emailAddress: values.emailAddress,
            relevantTo: values.relevantTo,
            facebookPageUrl: values.facebookPageUrl,
            instagramPageUrl: values.instagramPageUrl,
            youtubePageUrl: values.youtubePageUrl,
            openingHours: values.openingHours,
            open24Hours: values.open24Hours,
            openOnWeekend: values.openOnWeekend,
            isKosher: values.isKosher,
            isAccessable: values.isAccessable,
            shortDescription: values.shortDescription,
            areaId: configurationValues.areaId,
            userId: configurationValues.userId,
            status: configurationValues.status,
            locationInfo: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            reservations: values.reservations
        }
        try {
            if (type === "add") {
                await client.service("business").create(valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
            else {
                await client.service("business").patch(values['_id'], valuesToSend)
                dispatch(set_table_changed(type))
                handleClose(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

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
                        fields={ModalInit.slice(0, 12)}
                        data={formData}
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
                        fields={ModalInit.slice(12, 20)}
                        data={formData}
                        options={areaSpecificData}
                        submitFunction={handleValues}
                        validiationFunction={validateSeconsFormPart}
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
                        fields={ModalInit.slice(20)}
                        data={formData} //Send the data in the correct format
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
            {formFields &&
                <Stepper
                    fields={formFields}
                    submitFunction={submitValues}
                    externalActiveStep={step}
                    setExternalActiveStep={setStep}
                    orientation={orientation}
                />}
        </Box>
    );
});
