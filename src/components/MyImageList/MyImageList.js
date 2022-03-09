import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { client } from '../../API/metro'


export default function MyImageList({media, setMedia, initialData, type }) {

    const deleteItem = ( item ) => {

        let newMedia = media.filter( mediaItem => item.item.file._id !== mediaItem.file._id)
        setMedia(newMedia)

        let ids = newMedia.map( (item) => {
            return {fileId:item.file._id, metadata: {type: item.metadata.type}}
        })
        
        const dataToSend = { galleryFileIds : [ ...ids ], gallery: [ ...newMedia]}
        
        client.service("business").patch(initialData.id, dataToSend)
                         .then((res) => {
                             console.log(res)
                             setMedia([...res.gallery])
                            })
    }

    return (
        <>
            <ImageList sx={{ width: '100%', height: '100%' }} cols={4} rowHeight={200}>
                {media.map( (item, index) => {
                    if(item.metadata.type === type && type !== 'video' && type !== 'files') {
                        return(
                        <ImageListItem key={index} id={item.file._id}>
                        <a href={item.file.url} target="_blank">
                        <img
                            src={item.file.url}
                            loading="lazy"
                            style={{width:"200px", height:"200px", position: "relative"}}
                        />
                        </a>
                        <div style={{borderRadius: "15px", position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                            <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                        </div>
                    </ImageListItem>)
                }else if(item.metadata.type === type){
                    return(
                    <ImageListItem key={index} id={item.file._id}>
                        <img
                            src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqq5ltRQ5Lw76-z5DKbEqEgjuBnQ2U-orZJQ&usqp=CAU"}
                            loading="lazy"
                            style={{width:"200px", height:"200px", position: "relative"}}
                        />
                        <div style={{borderRadius: "15px", position:"absolute", left: "0px", top: "5px",  left: "5px", backgroundColor: "rgba(255, 255, 255, 0.7)",cursor:"pointer"}}>
                            <DeleteOutlineOutlinedIcon onClick={ () => deleteItem({item})} sx={{color:"black"}}/>
                        </div>
                    </ImageListItem>)
                }
                })}
            </ImageList>
        </>
    );
}


{/* {(type === 'image' || type === 'logo') &&
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
                } */}


                // if(item.item.local) {
                //     const newGallery = gallery.filter( galleryItem => galleryItem.file.url !== item.item.url)
                //     const newIds = (JSON.parse(initialData.galleryFileIds)).filter( id => id.fileId !== item.item.id)
                //     const dataToSend = { galleryFileIds : [ ...newIds ], gallery: [ ...newGallery]}
                //     const newLocalImagesArr = imagesArr.filter( localImage => localImage.url !== item.item.url)
                //     setImageArr(newLocalImagesArr)
                //     client.service("business").patch(initialData.id, dataToSend)
                //         .then(res => console.log(res))
                // }else{
                //     const newGallery = gallery.filter( galleryItem => galleryItem.file.url !== item.item.file.url)
                //     const newIds = (JSON.parse(initialData.galleryFileIds)).filter( id => id.fileId !== item.item.file._id)   
                //     const dataToSend = { galleryFileIds : [ ...newIds ], gallery: [ ...newGallery]}
                
                //     document.getElementById(item.item.file._id).style.display = 'none'
        
                //     client.service("business").patch(initialData.id, dataToSend)
                //         .then(res => console.log(res))
                // }