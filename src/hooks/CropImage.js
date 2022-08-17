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
                style={{ width: '100%', margin: "auto", display: "block" }}
                highlight={false}
                zoomTo={0.5}
                src={src}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                background={true}
                responsive={true}
                autoCropArea={1}
                onInitialized={(instance) => {
                    setCropper(instance);
                }}
                guides={true}
            />
            <Button
                style={{ width: 150 }}
                size="large"
                variant="contained"
                color="primary"
                onClick={() => { handleClick(cropper, onClick) }}
            >
                {term('send')}
            </Button>
        </div>
    )
}

export default CropImage