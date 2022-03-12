import { FileUploader } from "react-drag-drop-files";
import { resizeFile } from './FileResizer.js'
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import term from '../terms'

function DragDrop( {fileTypes, onRecieveFile} ) {

    const handleChange = (file) => {
        if(file.type.substring(0,5) === 'image'){
            resizeFile(file, 800, 600, "JPEG").then( (resizedFile) => {
                onRecieveFile(resizedFile, "Image")
            })      
        }else{
            onRecieveFile(file, "file")
        }
    }

    return(
        <FileUploader
            children={
                <div style={{marginTop: "20px", marginBottom: "20px", cursor:"pointer", borderRadius: "10px", border: "2px dashed #142F43",height: "250px", width:"50vw",display:"flex",justifyContent:'center', alignItems:"center"}}>
                    <p style={{fontWeight:"bold", marginLeft: "10px"}}>{term("upload_files")}</p>
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