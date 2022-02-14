import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { em } from '../../utils/document';


export default function EncodedImageList({ imagesArr }) {
    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={6} rowHeight={200}>
                {imagesArr.length ? imagesArr.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={item.url}
                            alt={item.alt}
                            loading="lazy"
                        />
                    </ImageListItem>
                )) : null}
            </ImageList>
        </>
    );
}


