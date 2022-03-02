import React, { useState, useEffect } from "react";
import { FileUploader } from "react-drag-drop-files";
import { client } from "../API/metro";
import { set_table_changed } from '../REDUX/actions/main.actions'
import { useDispatch } from 'react-redux';

function DragDrop({ setArr, fileTypes, initialData }) {
    // local
    const [file, setFile] = useState(null);
    
    const [values, setValues] = useState({
            galleryFileIds: []
    });

    const dispatch = useDispatch();

      useEffect( () => {
          setValues({ galleryFileIds : JSON.parse(initialData.galleryFileIds)})
      }, [])

      const handleGalleryFileIds = ( newImage ) => {
        setValues(pervState => ({ ...pervState, galleryFileIds: [ ...pervState.galleryFileIds, newImage ]  }));
        //newImage = { ...values, galleryFileIds: [ ...values.galleryFileIds, newImage ]  }
        let mapTest = new Map();
        mapTest.set('a', 1);
        mapTest.set('b',2);
        console.log(mapTest)
        client.service("business").patch(initialData.id, mapTest)
            .then(res => console.log(res))
            // .then(() => dispatch(set_table_changed("upload_media" + Math.random())))
      };
    

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
            onUploadProgress: function (progressEvent) {
                // const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            }
        };

        client.service("files").create(formData, config.onUploadProgress).then(res => {
            console.log(res[0]._id)
            handleGalleryFileIds(res[0]._id)
            setArr(prevState => [ res[0].url, ...prevState ]);
        })
    };

    const handleChange = (file) => {
        try {
            setFile(file);
            upload_media(file);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <FileUploader
                handleChange={handleChange}
                name={file?.name || 'file'}
                types={fileTypes}
                hoverTitle="Drop here"
                label="Upload or drop a file right here"
                maxSize={5} //size in mb
            />
        </>
        
        );
    }
    
    export default DragDrop;