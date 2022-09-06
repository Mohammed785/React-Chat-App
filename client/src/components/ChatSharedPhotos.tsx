import {useState} from "react"
import Image from "@mui/icons-material/Image";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DownloadIcon from '@mui/icons-material/Download';
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import { useChatContext } from "../context/chatContext";
import axiosClient from "../axios"

function SharedPhotos(){
   const [open,setOpen]=useState(false);
   const [images,setImages] = useState([])
   const [selectedImg,setSelectedImg] = useState("");
   const {selectedRoom} = useChatContext()
   const handleOpenImg = (url:string)=>{
      setSelectedImg(url)
      setOpen(true)
   }
   const handleDownloadImg = async()=>{
      window.open(`http://localhost:8000/download?file=${selectedImg}`)
   }
   const handleLoadImages = async()=>{
      if(images.length){
         return
      }
      try{
         const {data} = await axiosClient.get(`room/${selectedRoom?._id}/images`)
         console.log(data)
         setImages(data.images)
      }catch(e){
         console.error(e)
      }
   }
    return <>
     <div className="detail-photos">
      <Tooltip title="Load Images">
         <Button onClick={handleLoadImages} sx={{marginBottom:"15px"}} variant="contained" fullWidth className="detail-photo-title">
            <Image/>
            Shared photos
         </Button>
      </Tooltip>
      <Dialog open={open} onClose={()=>{setOpen(false)}}>
         <Tooltip title="Download">
            <IconButton sx={{position:"absolute",right:"0",margin:"5px"}} onClick={handleDownloadImg} color="primary">
               <DownloadIcon/>
            </IconButton>
         </Tooltip>
             <img src={process.env.REACT_APP_STATIC_PATH + "messages/" + selectedImg}/>
      </Dialog>
         <div className="detail-photo-grid">
            {
               images&&images.map((image,idx)=>{
                  return <img key={idx} src={process.env.REACT_APP_STATIC_PATH+"messages/"+image} onClick={()=>{handleOpenImg(image)}} loading="lazy"/>
               })
            }
               </div>
            
            </div>
    </>
}

export default SharedPhotos;