import { useState } from 'react'
import { Button } from '@material-ui/core';
import term from '../terms';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";


const CropImage = ({ src, onClick, style }) => {

    const [cropper, setCropper] = useState(null)

    const handleClick = () => {
        fetch(cropper.getCroppedCanvas().toDataURL()).then((res) => {
            res.blob().then((res) => {
                let fileToUpload = new File([res], "imageFile", { type: "image/png" })
                onClick(fileToUpload)
            })
        })
    }
    return (
        <div className={style}>
            <Cropper
                style={{ width: '30%', margin: "auto", display: "block" }}
                zoomTo={1}
                src={src}
                viewMode={0}
                aspectRatio={16 / 9}
                onInitialized={(instance) => {
                    setCropper(instance);
                }}
            />
            <Button
                style={{ width: 150, marginTop: '5px' }}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => { handleClick(cropper, onClick) }}
            >
                {term('confirm')}
            </Button>
        </div>
    )
}

export default CropImage