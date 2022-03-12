import { Button } from '@material-ui/core';
import term from '../terms';
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

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

const handleClick = (cropper, onClick) => {
    fetch(cropper.getCroppedCanvas().toDataURL()).then( (res) => {
        res.blob().then( (res) => {
            let fileToUpload = new File([res], "imageFile", { type: "image/png" })
            onClick(fileToUpload)
        })
    })
}

const cropImage = ({ cropper, setCropper, src,  onClick, style  }) => {
    return (
        <div className={style}>
            <Cropper
                style={{ width: "50vw", height: "400px"}}
                zoomTo={0.5}
                aspectRatio={1}
                src={src}
                viewMode={1}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
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
                onClick={() => {handleClick(cropper, onClick)}}
            >
                {term('crop_image')}
            </Button>
        </div>
    )
}

export default cropImage