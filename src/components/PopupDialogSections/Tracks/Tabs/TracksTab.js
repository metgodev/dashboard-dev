import React, { useEffect, useState } from 'react'
import { ModalInit } from '../popConfig'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import useStyles from './styles'
import Stepper from '../../../Stepper/Stepper'
import { validateFirstFormPart, validateSecondFormPart, validateThirdFormPart } from './Validations'
import { GetFormFields } from './HandleTracksData'
import { GetValuesForForm, getTagIdsToSend } from '../../CategoryConfig'
import get_orientation from '../../../../utils/get_orientation'

export const TracksTab = ({ handleClose, type, areaSpecificData }) => {
    //global
    let dispatch = useDispatch()
    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);
    //local
    const classes = useStyles()

    const [values, setValues] = useState({});
    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')

    useEffect(() => {
        setValues(init)
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [init]);

    const formData = GetValuesForForm(values)

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues }))
        setStep(prev => prev + 1)
    }

    const submitValues = async () => {

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
