import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { client } from "../API/metro";
import { set_table_changed } from '../REDUX/actions/main.actions'
import { useDispatch } from 'react-redux';
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CropImage, { cropFile } from "./CropImage";

function DragDrop({ setArr, fileTypes, initialData, mediaType, showImage, setShowImage }) {
    // local
    const [file, setFile] = useState(null);
    const [values, setValues] = useState({
            galleryFileIds: []
    });
    const [image, setImage] = useState();
    const [cropper, setCropper] = useState();

    const dispatch = useDispatch();

      useEffect( () => {
          setValues({ galleryFileIds : JSON.parse(initialData.galleryFileIds)})
      }, [])

      const handleGalleryFileIds = ( imageId ) => {
            setValues(pervState => ({ ...pervState, galleryFileIds: [ ...pervState.galleryFileIds, { fileId:imageId, metadata:{type:mediaType} } ]  }));

            let imageToUpload = { ...values, galleryFileIds: [ ...values.galleryFileIds, { fileId:imageId, metadata:{ type:mediaType } } ] }

            client.service("business").patch(initialData.id, imageToUpload )
                .then(res => console.log(res))
                .then(() => dispatch(set_table_changed("upload_media" + Math.random())))
      };
    

    const upload_media = async (file) => {

        fetch(file).then( (res) => {
                    res.blob().then(
                         (res) => 
                            {
                                let fileToUpload = new File([res], "imageFile", { type: "image/png" })
                                const formData = new FormData();
                                formData.append("file", fileToUpload);
                                client.service("files").create(formData).then(res => {
                                    handleGalleryFileIds( res[0]._id )
                                    setArr(prevState => [ {url: res[0].url, id: res[0]._id, local:true} , ...prevState ]);
                                })
                            }
                         )
                }
            )
    };

    const handleChange = (file) => {
        if(file.type.substring(0,5) === 'image'){
            try {
                resizeFile(file, 533, 711, "JPEG").then( (res) => {
                    cropFile(res, setImage);
                    setFile(res);
                    setShowImage(true);
                })
            } catch (err) {
                console.log(err);
            }
        }else{
            handleFiles(file)
        }
    };

    const handleFiles = (file) => {
        const formData = new FormData();
        formData.append("file", file);
        console.log(file)
        client.service("files").create(formData).then( (res) => {
            console.log(res)
            setArr(prevState => [...prevState, "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqq5ltRQ5Lw76-z5DKbEqEgjuBnQ2U-orZJQ&usqp=CAU"])
            let videoToUpload = { ...values, galleryFileIds: [ ...values.galleryFileIds, { fileId:res[0]._id, metadata:{ type: mediaType } } ] }

            client.service("business").patch(initialData.id, videoToUpload )
                .then(res => console.log(res))
                .then(() => dispatch(set_table_changed("upload_media" + Math.random())))
        })
    }

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