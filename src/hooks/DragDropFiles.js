import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { client } from "../API/metro";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ setValues ,setImagesArr }) {
    // local
    const [file, setFile] = useState(null);

    const upload_media = async (file) => {
        const formData = new FormData();
        if (Array.isArray(file)) {
            file.forEach(f => {
                formData.append("file", f);
            });
        } else {
            formData.append("file", file);
        }
        const config = {
            onUploadProgress: (event) => {
                return Math.round((event.loaded * 100) / event.total);
            }
        };
        client.service("files").create(formData, {
            onUploadProgress: config.onUploadProgress
        }).then(res => {
            setValues(prevState => ({ ...prevState, galleryFileIds: [...prevState.galleryFileIds, res[0]._id] }))
            setImagesArr(prevState => [...prevState, res[0].url]);
        })
    };

    const handleChange = async (file) => {
        try {
            setFile(file);
            upload_media(file);
        } catch (err) {
            console.log(err);
        }
    };


    return (
        <FileUploader
        handleChange={handleChange}
        name={file?.name || 'file'}
        types={fileTypes}
        hoverTitle="Drop here"
        label="Upload or drop a file right here"
            maxSize={5} //size im mb
        fileOrFiles
        />
        );
    }
    
    export default DragDrop;
    
    // import { IconButton } from '@mui/material';
    // import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
    
        // children={
        //     <div style={{ height: '30vh', border: '2px dashed lightBlue' }}>
        //         <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        //             <FileUploadOutlinedIcon fontSize='large' />
        //             <p>Upload or drop a file right here</p><br></br>
        //             <p>{fileTypes.join('-')}</p>
        //         </div>
        //     </div>}