import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { em } from '../../utils/document';


export default function EncodedImageList({ base64Image }) {
    return (
        <>
            <ImageList sx={{ width: em(50), height: em(50) }} cols={3} rowHeight={164}>
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


