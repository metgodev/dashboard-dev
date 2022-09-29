import React, { useEffect, useState } from "react";
import useStyles from './styles'
import { Box } from "@mui/material";
import { ModalInit } from "../popConfig";
import { useSelector } from "react-redux";
import client from "../../../../API/metro";
import Stepper from '../../../Stepper/Stepper'
import { useDispatch } from "react-redux";
import get_orientation from '../../../../utils/get_orientation'
import { set_table_changed } from "../../../../REDUX/actions/main.actions";
import { validateFirstFormPart, validateSeconsFormPart, validateThirdFormPart } from './Validations'
import { initialState, GetFormFields } from './HandleBusinessData'
import { GetValuesForForm } from "../../CategoryConfig";
import Toast from "../../../../utils/useToast";
import ROLES from "../../../../data/roles";
import { set_user_details } from "../../../../REDUX/actions/user.actions";
import term from "../../../../terms";
import GetPermissions from "../../../../hooks/GetPermissions";
import BACK_ROUTES from "../../../../data/back_routes";

export const ModifyTab = React.memo(({ type, areaSpecificData, handleClose }) => {
    //global
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((s) => s.mainRememberReducer);
    const permissions = GetPermissions()
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
            tagsIds: values.tags.map(tag => tag.value),
            description: values.description,
            authorityId: values.authorityId,
            address: values.address,
            locationName: values.locationName,
            phoneNumber: values.phoneNumber,
            contactPersonName: values.contactPersonName,
            contactPersonPhoneNumber: values.contactPersonPhoneNumber,
            websitesUrl: values.websitesUrl,
            emailAddress: values.emailAddress,
            relevantTo: values.relevantTo.map(value => value.value),
            facebookPageUrl: values.facebookPageUrl,
            instagramPageUrl: values.instagramPageUrl,
            youtubePageUrl: values.youtubePageUrl,
            openingHours: values.open24Hours ? {} : values.openingHours,
            open24Hours: values.open24Hours,
            openOnWeekend: values.openOnWeekend,
            isKosher: values.isKosher,
            isAccessable: values.isAccessable,
            shortDescription: values.shortDescription,
            areaId: configurationValues.areaId,
            userId: configurationValues.userId,
            status: configurationValues.status,
            whatsAppPhoneNumber: values.whatsAppPhoneNumber,
            locationInfo: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            location: {
                type: "Point",
                coordinates: values.locationInfo.coordinates
            },
            reservations: values.reservations,
            approveContent: values.approveContent,
            isPremium: values.isPremium
        }
        try {
            if (permissions.edit) {
                if (type === "add") {
                    const userBusinessRole = await client.service(BACK_ROUTES.USER_ROLES).find({ query: { userId: user.id, roleId: ROLES.BUSINESS_ROLE_ID } })
                    if (userBusinessRole.data.length === 1) {
                        const roleId = userBusinessRole.data[0]._id
                        const businessRes = await client.service(BACK_ROUTES.BUSINESS).create(valuesToSend)
                        await client.service(BACK_ROUTES.USER_ROLES).patch(roleId, { resourceIds: [...userBusinessRole.data[0].resourceIds, businessRes._id] })
                        const newUserDetails = await client.service(BACK_ROUTES.USERS).find({ query: { _id: user.id } })
                        dispatch(set_user_details(newUserDetails.data[0]))
                        dispatch(set_table_changed(type))
                    } else {
                        await client.service(BACK_ROUTES.BUSINESS).create(valuesToSend)
                        dispatch(set_table_changed(type))
                        Toast()
                    }
                    handleClose(false)
                }
                else {
                    await client.service("business").patch(values['_id'], valuesToSend)
                    dispatch(set_table_changed(type))
                    handleClose(false)
                }
            } else {
                Toast(term('you_dont_have_permission'))
            }
        } catch (e) {
            console.log('modifyTab', e)
            Toast()
        }
    }

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues, websitesUrl: [formValues.websitesUrl] }))
        setStep(prev => prev + 1)
    }

    let formFields = GetFormFields(ModalInit, formData, areaSpecificData, handleValues, validateFirstFormPart, validateThirdFormPart, validateSeconsFormPart, orientation, setValues)

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
    );
});
