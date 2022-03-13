import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'

function DragDrop({ fileTypes, onRecieveFile }) {

    const handleChange = (file) => {
        if (file.type.substring(0, 5) === 'image') {
            resizeFile(file, 1920, 1080, "JPEG").then((resizedFile) => {
                onRecieveFile(resizedFile, "Image")
            })
        } else {
            onRecieveFile(file, "file")
        }
    }

    return (
        <FileUploader
            children={
                <div style={styles.dragAndDrop}>
                    <p style={styles.innerText}>{term("upload_files")}</p>
                    <AddPhotoAlternateOutlinedIcon />
                </div>
            }
            multiple={true}
            handleChange={handleChange}
            name={'file'}
            types={fileTypes}
            maxSize={40} //size in mb
        />
    )
}

const styles = {
    dragAndDrop: {
        cursor: "pointer",
        borderRadius: "10px",
        border: "2px dashed #c1c1c1",
        height: "250px",
        width: "50rem",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    innerText: {
        fontSize: "1.3rem",
        fontWeight: "500",
    }
}

export default DragDrop;