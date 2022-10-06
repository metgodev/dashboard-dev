import React, { useEffect, useState } from "react";
import useStyles from './styles'
import { Box } from "@mui/material";
import { ModalInit } from "../popConfig";
import { useSelector } from "react-redux";
import Stepper from '../../../Stepper/Stepper'
import { useDispatch } from "react-redux";
import get_orientation from '../../../../utils/get_orientation'
import { validateFirstFormPart, validateSeconsFormPart, validateThirdFormPart } from './Validations'
import { GetFormFields, SubmitBusiness } from './HandleBusinessData'
import { GetValuesForForm } from "../../CategoryConfig";
import GetPermissions from "../../../../hooks/GetPermissions";
import { set_user_details } from "../../../../REDUX/actions/user.actions";
import { set_table_changed } from "../../../../REDUX/actions/main.actions";

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
        console.log(init)
        handleSetValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init]);

    const handleSetValues = (init) => setValues(init);

    const submitValues = async () => {
        const { newUserDetails } = await SubmitBusiness(area, user, values, permissions, type, handleClose)
        if (newUserDetails) {
            dispatch(set_user_details(newUserDetails.data[0]))
        }
        dispatch(set_table_changed(type))
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