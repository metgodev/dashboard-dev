import React from 'react'
import { Button } from '@mui/material'
import term from '../../../../terms'
import { useDispatch } from 'react-redux'
import { set_copy_product_data } from '../../../../REDUX/actions/data.actions'

function CopyRenderer(props) {

    const dispatch = useDispatch()

    const handleClick = () => {
        const valuesToCopy = {
            areaId: props.data.areaId,
            businessId: props.data.businessId,
            description: props.data.description,
            description: props.data.description,
            inStock: props.data.inStock,
            name: props.data.name,
            price: props.data.price,
            productComponents: props.data.productComponents,
            productIncludes: props.data.productIncludes,
            relevantTo: props.data.relevantTo,
            shipmentType: props.data.shipmentType,
            sizeAndDimension: props.data.sizeAndDimension,
            style: props.data.style,
            tagsIds: props.data.tagsIds,
            useageRestrictions: props.data.useageRestrictions,
        }
        dispatch(set_copy_product_data(valuesToCopy))
    }

    return (
        <Button
            variant={'contained'}
            onClick={handleClick}
        >
            {term('duplicate')}
        </Button>
    )
}

export default CopyRenderer