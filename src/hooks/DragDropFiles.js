import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'
import useStyles from './styles'

function DragDrop({ fileTypes, onRecieveFile }) {

    const classes = useStyles()

    const handleChange = (file) => {
        if (file.type.substring(0, 5) === 'image') {
            resizeFile(file, 1200, 1200, "PNG").then((resizedFile) => {
                onRecieveFile(resizedFile, "Image")
            })
        } else {
            onRecieveFile(file, "file")
        }
    }

    return (
        <FileUploader
            children={
                <div className={classes.dragAndDrop}>
                    <p className={classes.innerText}>{term("upload_files")}</p>
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

export default DragDrop;