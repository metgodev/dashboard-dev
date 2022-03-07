import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { client } from '../../API/metro'


export default function MyImageList({ gallery, imagesArr, initialData, type }) {

    const deleteItem = ( item ) => {
        if(item.item.local) {
            const newGallery = gallery.filter( galleryItem => galleryItem.file.url !== item.item.url)
            const newIds = (JSON.parse(initialData.galleryFileIds)).filter( id => id.fileId !== item.item.id)
            const dataToSend = { galleryFileIds : [ ...newIds ], gallery: [ ...newGallery]}
            document.getElementById(item.item.id).style.display = 'none'
            client.service("business").patch(initialData.id, dataToSend)
                .then(res => console.log(res))
        }else{
            const newGallery = gallery.filter( galleryItem => galleryItem.file.url !== item.item.file.url)
            const newIds = (JSON.parse(initialData.galleryFileIds)).filter( id => id.fileId !== item.item.file._id)   
            const dataToSend = { galleryFileIds : [ ...newIds ], gallery: [ ...newGallery]}
        
            document.getElementById(item.item.file._id).style.display = 'none'

            client.service("business").patch(initialData.id, dataToSend)
                .then(res => console.log(res))
        }
    }

    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={4} rowHeight={200}>
            {(type === 'image' || type === 'logo') &&
            imagesArr.length ? imagesArr.map((item, i) => (
                    <ImageListItem key={i} id={item.id}>
                        <img
                            src={item.url}
                            loading="lazy"
                            style={{width:"200px", height:"200px", position: "relative"}}
                        />
                        <div style={{borderRadius: "15px", position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                            <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                        </div>
                    </ImageListItem>
                )) : null}
                { (type === 'image' || type === 'logo') && gallery ? gallery.map((item, i) => (
                    item.metadata.type === type && 
                    <ImageListItem key={i} id={item.file._id}>
                        <a href={item.file.url} target="_blank">
                           <img
                                src={item.file.url}
                                alt={item.file.alt}
                                loading="lazy"
                                style={{width:"200px", height:"200px", position: "relative"}}
                            /> 
                        </a>
                        
                        <div style={{borderRadius: "15px",position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                            <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                        </div>
                    </ImageListItem>
                )) : null
                }
                {(type === "files" || type === "video") &&
                    imagesArr.length ? imagesArr.map((item, i) => (
                        <ImageListItem key={i} id={item._id}>
                            <img
                                src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqq5ltRQ5Lw76-z5DKbEqEgjuBnQ2U-orZJQ&usqp=CAU"}
                                loading="lazy"
                                style={{width:"200px", height:"200px", position: "relative"}}

                            />
                            <div style={{borderRadius: "15px",position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                                <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                            </div>
                        </ImageListItem>
                    )) : null}
                    {(type === "files" || type === "video") && gallery ? gallery.map((item, i) => (
                        item.metadata.type === type && 
                        <ImageListItem key={i} id={item.file._id}>
                            <a href={item.file.url} target="_blank">
                                <img
                                    src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqq5ltRQ5Lw76-z5DKbEqEgjuBnQ2U-orZJQ&usqp=CAU"}
                                    alt={item.file.alt}
                                    loading="lazy"
                                    style={{width:"200px", height:"200px", position: "relative"}}
                                />
                            </a>
                            <div style={{borderRadius: "15px",position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                                <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                            </div>
                        </ImageListItem>
                    )) : null
                }
            </ImageList>
        </>
    );
}


