import React, { useEffect, useState } from 'react'
import { Box, Paper } from '@mui/material'
import useStyles from './styles'
import placeholder_image from '../../Assets/images/placeholder.jpeg'
import BACK_ROUTES from '../../data/back_routes'
import term from '../../terms'

function MobileTableEntity({ entity, onClick, display }) {

    const [name, setName] = useState('')
    const [picture, setPicture] = useState('')

    useEffect(() => {
        handleSetName()
        handleSetPicture()
    }, [])

    const handleSetName = () => {
        if (entity.name && entity.shortDescription) {
            setName(`${entity.name} - ${entity.shortDescription}`)
        }
        else if (entity.name && !entity.ShortDescription) {
            setName(`${entity.name}`)
        }
        else if (display === BACK_ROUTES.TAG_CATEGORIES) {
            setName(`${term(entity.category.title)} - ${entity.tag.title}`)
        }
        else if (display === BACK_ROUTES.USERS) {
            setName(`${entity.email || entity.phoneNumber}`)
        }
    }

    const handleSetPicture = () => {
        setPicture(entity.gallery ? entity.gallery[0].file.url : entity.coverImageFileId ? entity.coverImage.url : placeholder_image)
    }

    const classes = useStyles()

    return (
        <Paper className={classes.entity} onClick={() => onClick(entity)}>
            <Box className={classes.entityImageContainer}>
                <img className={classes.entityImage} src={picture} />
            </Box>
            <Box className={classes.heading}>
                {name}
            </Box>
            <Box>
                {entity?.authority?.name}
            </Box>
        </Paper>
    )
}

export default MobileTableEntity