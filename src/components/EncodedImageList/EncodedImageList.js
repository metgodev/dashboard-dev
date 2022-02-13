import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { em } from '../../utils/document';


export default function EncodedImageList({ imagesUri }) {
    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={6} rowHeight={200}>
                {imagesUri.length ? imagesUri.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={item.imageUri}
                            srcSet={`${item.imageUri} 2x`}
                            alt={item.alt}
                            loading="lazy"
                        />
                    </ImageListItem>
                )) : null}
            </ImageList>
        </>
    );
}


