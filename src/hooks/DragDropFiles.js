import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from "./FileResizer";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop({ setBase64Image }) {
    const [file, setFile] = useState(null);
    const handleChange = async (file) => {
        try {
            setFile(file);
            const image = await resizeFile(file);
            setBase64Image(prevState =>([ ...prevState, {image , alt:file?.name} ]));
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