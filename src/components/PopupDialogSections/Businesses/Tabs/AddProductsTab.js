import React, { useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import AgTableProducts from '../../../Tables/ProductsTable/AgTableProducts'
import Stepper from '../../../Stepper/Stepper'
import term from '../../../../terms'
import { useSelector } from 'react-redux'
import get_orientation from '../../../../utils/get_orientation'
import { productFields } from '../popConfig'
import useStyles from './styles'
import { GetProductFormFields } from './HandleBusinessData'
import client from "../../../../API/metro";
import { set_table_changed } from "../../../../REDUX/actions/main.actions";
import { useDispatch } from "react-redux";
import useGetService from '../../../../hooks/useGetService'
import { set_copy_product_data } from '../../../../REDUX/actions/data.actions'
import { GetValuesForForm } from '../../CategoryConfig'
import { validateFirstProductTab, validateSecondProductTab } from './Validations'
import Toast from '../../../../utils/useToast'

function AddProductsTab({ areaSpecificData, type }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const { area, lang } = useSelector((s) => s.mainRememberReducer);
    const init = useSelector((s) => s.mainReducer.editTabData);
    const product = useSelector(s => s.dataReducer.copy_product_data)
    const products = useGetService('products', 'products', { businessId: init._id }, area.id, true)

    const [listOrNewProduct, setListOrNewProduct] = useState(true) //true = List, false = New product
    const [orientation, setOrientation] = useState(null)
    const [values, setValues] = useState({})
    const [step, setStep] = useState(0)

    const handleValues = (formValues) => {
        if (formValues.dontSkipStep) {
            delete formValues.dontSkipStep
            setValues(prev => ({ ...prev, ...formValues }))
        } else {
            setValues(prev => ({ ...prev, ...formValues }))
            setStep(prev => prev + 1)
        }
    }

    const formData = GetValuesForForm(values, areaSpecificData.tagsIds)
    const formFields = GetProductFormFields(productFields, formData, areaSpecificData, orientation, handleValues, setStep, validateFirstProductTab, validateSecondProductTab)

    useEffect(() => {
        setOrientation(get_orientation(lang))
        if (Object.keys(product).length > 0) {
            setValues(product)
            setListOrNewProduct(false)
        } else {
            setValues({})
        }
    }, [lang, product])

    const submitFunction = async () => {
        const valuesToSend = {
            ...values,
            galleryFileIds: values?.galleryFileIds ? values?.galleryFileIds.map(item => ({ fileId: item.fileId, metadata: { type: 'image' } })) : [],
            areaId: area.id,
            businessId: init._id,
            status: 'PENDING_APPROVAL'
        }
        try {
            await client.service("products").create(valuesToSend)
            setListOrNewProduct(true)
            dispatch(set_table_changed(type))
        } catch (e) {
            console.log('addProductsTab', e)
            Toast()
        }
    }

    const handleButtonClick = () => {
        setStep(0)
        dispatch(set_copy_product_data({}))
        setListOrNewProduct(prev => !prev)
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '10px', direction: orientation }}>
            <Button
                onClick={handleButtonClick}
                sx={{ marginBottom: '7px', width: '100px' }}
                variant='contained'
            >
                {listOrNewProduct ? term('add') : term('cancel')}
            </Button>
            {listOrNewProduct ?
                <AgTableProducts products={products.data} />
                :
                <Box className={classes.container} >
                    <Stepper
                        fields={formFields}
                        submitFunction={submitFunction}
                        orientation={orientation}
                        externalActiveStep={step}
                        setExternalActiveStep={setStep}
                    />
                </Box>
            }
        </Box >
    )
}

export default React.memo(AddProductsTab)