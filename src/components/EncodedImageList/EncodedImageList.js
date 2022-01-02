import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { CardMedia } from '@material-ui/core';


export default function EncodedImageList({ base64Image }) {
    return (
        <>
            {/* {console.log(base64Image)} */}
            <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                {base64Image.length ? base64Image.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={item.image}
                            srcSet={`${item.image} 2x`}
                            alt={item.alt}
                            loading="lazy"
                        />
                    </ImageListItem>
                )) : null}
            </ImageList>
        </>
    );
}


