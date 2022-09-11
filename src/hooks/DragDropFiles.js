import { useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'
import useStyles from './styles'
import { Box } from "@mui/system";

function DragDrop({ uploadCategory, onRecieveFile }) {

    const classes = useStyles()

    const getMaximumFileSize = useCallback(() => {
        switch (uploadCategory.type) {
            case 'image':
                return 5
            case 'logo':
                return 5
            case 'video':
                return 40
            case 'files':
                return 10
        }
    }, [uploadCategory])

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
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
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
                types={uploadCategory.fileTypes}
                maxSize={getMaximumFileSize()} //size in mb
            />
            <p className={classes.maximumUploadText}>{`${term('maximum_file_upload_size_is')} ${getMaximumFileSize()} MB.`}</p>
        </Box>
    )
}

export default DragDrop;