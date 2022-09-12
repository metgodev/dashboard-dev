import { useCallback } from "react";
import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'
import useStyles from './styles'
import { Box } from "@mui/system";
import Toast from '../utils/useToast'
import { useSelector } from "react-redux"
import GetPermissions from "./GetPermissions"

function DragDrop({ uploadCategory, onRecieveFile }) {

    const classes = useStyles()
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions(userDetails)

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
        if (permissions.edit) {
            if (file.type.substring(0, 5) === 'image') {
                resizeFile(file, 1200, 1200, "PNG").then((resizedFile) => {
                    onRecieveFile(resizedFile, "Image")
                })
            } else {
                onRecieveFile(file, "file")
            }
        }
        else {
            Toast(term('you_dont_have_permission'))
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