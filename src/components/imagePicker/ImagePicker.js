import React, { useState } from 'react'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Box, Collapse, ImageList, ImageListItem } from '@mui/material'
//Styles
import useStyles from './styles'
//Constants
const NUMBER_OF_COLUMNS_IN_IMAGE_LIST = 4

const ImagePicker = ({ title, data, setChosenImage, chosenImage, disabled }) => {

    const classes = useStyles()

    const [open, setOpen] = useState(false)

    return (
        <Box>
            <Button disabled={disabled} variant="outlined" sx={{ marginBottom: '20px' }} className={classes.toggleButton} onClick={() => setOpen(prev => !prev)} style={{ width: '100%' }}>
                {title}
                {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} orientation="vertical">
                <Box className={classes.imageListContainer}>
                    <ImageList variant="quilted" cols={NUMBER_OF_COLUMNS_IN_IMAGE_LIST} >
                        {data?.ids?.map(entityId => {
                            return (
                                <Box className={chosenImage === data?.pictures?.find(pic => pic.id === entityId)?.pictureId ? classes.chosenImage : classes.image}>
                                    <ImageListItem key={entityId} cols={1} rows={1}>
                                        <img
                                            src={data?.pictures?.find(pic => pic?.id === entityId)?.url}
                                            alt={data?.pictures?.find(pic => pic?.id === entityId)?.url}
                                            onClick={() => setChosenImage(data?.pictures?.find(pic => pic.id === entityId)?.pictureId)}
                                        />
                                    </ImageListItem>
                                </Box>
                            )
                        })}
                    </ImageList>
                </Box>
            </Collapse >
        </Box>
    )
}

export default ImagePicker