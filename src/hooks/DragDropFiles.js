import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { client } from "../API/metro";
import { set_table_changed } from '../REDUX/actions/main.actions'
import { useDispatch } from 'react-redux';
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CropImage, { cropFile } from "./CropImage";

function DragDrop({media, setArr, fileTypes, initialData, mediaType, showImage, setShowImage, tab, setLoadingImage}) {
    console.log(media)
    // local
    const [file, setFile] = useState(null);
    const [image, setImage] = useState();
    const [cropper, setCropper] = useState();
    
    console.log(initialData)

    const dispatch = useDispatch();

      const handleGalleryFileIds = ( imageId ) => {
            let currentFileIds = media.map( (item) => {
                return(
                    {fileId: item.file._id, metadata: {type: item.metadata.type}}
                )
            })

            let imageToUpload = { galleryFileIds: [ ...currentFileIds, { fileId:imageId, metadata:{ type:mediaType } } ] }
    

            client.service(tab).patch(initialData.id, imageToUpload)
                .then((res) => {
                    console.log(res.gallery)
                    setArr([...res.gallery])
                    setLoadingImage(false)
                })
                .then(() => dispatch(set_table_changed("upload_media" + Math.random())))

      };
      

      const handleFiles = (file) => {
        setLoadingImage(true)
        const formData = new FormData();
        formData.append("file", file);
        console.log(file)
        client.service("files").create(formData).then( (res) => {
            let currentFileIds = media.map( (item) => {
                return(
                    {fileId: item.file._id, metadata: {type: item.metadata.type}}
                )
            })

            let videoToUpload = { galleryFileIds: [ ...currentFileIds, { fileId:res[0]._id, metadata:{ type:mediaType } } ] }

            console.log(tab)

            client.service(tab).patch(initialData.id, videoToUpload )
                .then((res) => {
                    setArr([...res.gallery])
                    setLoadingImage(false)
                })
                .then(() => dispatch(set_table_changed("upload_media" + Math.random())))
        })
    }

    const upload_media = async (file) => {
        setLoadingImage(true)
        fetch(file).then( (res) => {
                    res.blob().then(
                         (res) => 
                            {
                                let fileToUpload = new File([res], "imageFile", { type: "image/png" })
                                const formData = new FormData();
                                formData.append("file", fileToUpload);
                                client.service("files").create(formData).then(res => {
                                    handleGalleryFileIds( res[0]._id )
                                })
                            }
                         )
                }
            )
    };

    const handleChange = (file) => {
        if(file.type.substring(0,5) === 'image'){
            try {
                resizeFile(file, 800, 600, "JPEG").then( (res) => {
                    cropFile(res, setImage);
                    setFile(res);
                    setShowImage(true);
                })
            } catch (err) {
                console.log(err);
                setLoadingImage(false)
            }
        }else{
            handleFiles(file)
        }
    };

    return (
        <>
            {!showImage && <FileUploader
                children={
                    <div style={{backgroundColor:"rgba(0,0,0,0.1)", cursor:"pointer", borderRadius: "10px", border: "2px dashed #0000FF",height: "120px", width:"400px",display:"flex",justifyContent:'center', alignItems:"center"}}>
                        <p style={{fontWeight:"bold", marginLeft: "10px"}}>Upload files!</p>
                        <AddPhotoAlternateOutlinedIcon />
                    </div>
                }
                multiple={true}
                handleChange={handleChange}
                name={file?.name || 'file'}
                types={fileTypes}
                hoverTitle="Drop here"
                label="Upload or drop a file right here"
                maxSize={5} //size in mb
            />}
            {
                showImage && 
                    <CropImage setVisibility={setShowImage} cropper={cropper} visibility={showImage} src={image} setCropper={setCropper} upload_media={upload_media} />
            }
        </>
        
        );
    }
    
    export default DragDrop;