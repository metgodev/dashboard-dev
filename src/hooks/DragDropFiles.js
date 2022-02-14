import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { useDispatch } from "react-redux";
import { client } from "../API/metro";
import { set_images_arr } from "../REDUX/actions/main.actions";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop() {
    // local
    const [file, setFile] = useState(null);
    const [progress, setProgress] = useState(0);
    //global
    const dispatch = useDispatch();

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
            setProgress(config.onUploadProgress)
            dispatch(set_images_arr( {id:res[0]._id, url:res[0].url}))
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
        maxSize={2} //size im mb
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