import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'
import useStyles from './styles'
import { Box } from "@mui/system";

function DragDrop({ fileTypes, onRecieveFile }) {

    const classes = useStyles()
    const MAXIMUM_FILE_SIZE = 40

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
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
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
                maxSize={MAXIMUM_FILE_SIZE} //size in mb
            />
            <p className={classes.maximumUploadText}>{`${term('maximum_file_upload_size_is')} ${MAXIMUM_FILE_SIZE} MB.`}</p>
        </Box>
    )
}

export default DragDrop;