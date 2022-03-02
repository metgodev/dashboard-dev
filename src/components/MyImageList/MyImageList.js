import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { client } from '../../API/metro'


export default function MyImageList({ gallery, imagesArr, initialData }) {

    const deleteItem = ( item ) => {
        const newGallery = gallery.filter( galleryItem => galleryItem.url !== item.item.url)
        const newIds = (JSON.parse(initialData.galleryFileIds)).filter( id => id !== item.item._id)         
        const dataToSend = { galleryFileIds : [ ...newIds ], gallery: [ ...newGallery]}
        
        document.getElementById(item.item._id).style.display = 'none'

        // client.service("business").patch(initialData.id, dataToSend)
        //     .then(res => console.log(res))   
    }

    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={4} rowHeight={200}>
                
                {imagesArr.length ? imagesArr.map((item, i) => (
                    <ImageListItem key={i} id={item._id}>
                        <img
                            src={item}
                            loading="lazy"
                            style={{width:"200px", height:"200px", position: "relative"}}
                        />
                        <div style={{position:"absolute", left: "0px", backgroundColor: "white", cursor:"pointer"}}>
                            <DeleteForeverIcon onClick={ () => deleteItem({item})} sx={{color:"red"}}/>
                        </div>
                    </ImageListItem>
                )) : null}
                {gallery ? gallery.map((item, i) => (
                    <ImageListItem key={i} id={item._id}>
                        <img
                            src={item.url}
                            alt={item.alt}
                            loading="lazy"
                            style={{width:"200px", height:"200px", position: "relative"}}
                        />
                        <div style={{position:"absolute", left: "0px", backgroundColor: "white", cursor:"pointer"}}>
                            <DeleteForeverIcon onClick={ () => deleteItem({item})} sx={{color:"red"}}/>
                        </div>
                    </ImageListItem>
                )) : null}
            </ImageList>
        </>
    );
}


