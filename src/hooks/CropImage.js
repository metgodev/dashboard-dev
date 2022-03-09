import Cropper from "react-cropper";
import { Button } from '@material-ui/core';
import term from '../terms';
import "cropperjs/dist/cropper.css";


const getCropData = (upload_media, cropper, setVisibility) => {
    if (typeof cropper !== "undefined") {
        upload_media(cropper.getCroppedCanvas().toDataURL());
        setVisibility(false)
    }
};

export const cropFile = (file, setImage) => {
    const reader = new FileReader();
    reader.onload = () => {
        setImage(reader.result);
    };
    fetch(file).then((res) => {
        res.blob().then((res) => {
            reader.readAsDataURL(res);
        })
    });

}

const cropImage = ({ cropper, setVisibility, visibility, src, setCropper, upload_media }) => {
    return (
        visibility &&
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
            <Cropper
                style={{ width: 400, height: 400 }}
                zoomTo={0.5}
                aspectRatio={1}
                src={src}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                cropBoxResizable={false}
                background={false}
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
                onClick={() => { getCropData(upload_media, cropper, setVisibility) }}
            >
                {term('crop_image')}
            </Button>
        </div>
    )
}

export default cropImage