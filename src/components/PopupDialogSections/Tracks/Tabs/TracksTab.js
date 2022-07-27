import React, { useEffect, useState } from 'react'
import { ModalInit } from '../popConfig'
import { useDispatch, useSelector } from 'react-redux';
import { Box } from '@mui/material';
import useStyles from './styles'
import { validateFirstFormPart } from './Validations'
import { GetValuesForForm } from '../../CategoryConfig'
import get_orientation from '../../../../utils/get_orientation'
import Form from '../../../Form/Form'

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

    const submit = async () => {

    }

    return (
        <Box className={classes.container}>
            <Form
                fields={ModalInit}
                data={formData}
                options={areaSpecificData}
                submitFunction={submit}
                validiationFunction={validateFirstFormPart}
                orientation={orientation}
            />
        </Box>
    )
}
