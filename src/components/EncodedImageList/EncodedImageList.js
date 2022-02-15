import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';


export default function EncodedImageList({ gallery, imagesArr }) {
    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={6} rowHeight={200}>
                {/* {gallery ? gallery.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={item.url}
                            alt={item.alt}
                            loading="lazy"
                        />
                    </ImageListItem>
                )) : null} */}
                {imagesArr.length ? imagesArr.map((item, i) => (
                    <ImageListItem key={i}>
                        <img
                            src={item}
                            loading="lazy"
                        />
                    </ImageListItem>
                )) : null}
            </ImageList>
        </>
    );
}


