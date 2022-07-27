import React, { useState } from 'react'
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Button, Box, Collapse, ImageList, ImageListItem } from '@mui/material'
//Styles
import useStyles from './styles'
//Constants
const NUMBER_OF_COLUMNS_IN_IMAGE_LIST = 4

const ImagePicker = ({ title, pictures, setChosenImage, chosenImage }) => {


    const classes = useStyles()

    const [open, setOpen] = useState(false)

    // DATA ITEM EXAMPLE
    // {
    //     url: "https://www.stockvault.net/data/2015/07/09/174522/preview16.jpg",
    //     title: "first"
    // }

    return (
        <Box>
            <Button variant="outlined" sx={classes.toggleButton} onClick={() => setOpen(prev => !prev)} style={{ width: '100%' }}>
                {title}
                {open ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <Collapse in={open} orientation="vertical">
                <Box className={classes.imageListContainer}>
                    <ImageList variant="quilted" cols={NUMBER_OF_COLUMNS_IN_IMAGE_LIST} >
                        {pictures.map(picture => {
                            return (
                                <Box className={chosenImage === picture.title ? classes.chosenImage : classes.image}>
                                    <ImageListItem key={picture.url} cols={1} rows={1}>
                                        <img
                                            src={picture.url}
                                            alt={picture.title}
                                            onClick={() => setChosenImage(picture.title)}
                                        />
                                    </ImageListItem>
                                    {picture.title}
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