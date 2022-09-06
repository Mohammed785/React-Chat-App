import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Photo from "@mui/icons-material/Photo";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props{
    msg:string
    setMsg:(msg:string)=>void
    handleSendMsg:(e:FormEvent,image:File|null)=>Promise<void>
}

function SendImage({msg,setMsg,handleSendMsg}:Props){
    const [open,setOpen] = useState(false)
    const [image,setImage] = useState<{selected:File|null,preview:string}>({selected:null,preview:""})
    const handleImage = (e:ChangeEvent<HTMLInputElement>)=>{
        const img = e.target.files?e.target.files[0]:null
        if(img){
            setImage({selected:img,preview:URL.createObjectURL(img)})
            setOpen(true)
        }
    }
    return <>
    <Dialog open={open} onClose={()=>{setOpen(false)}}>
        <form method="post" onSubmit={async(e)=>{await handleSendMsg(e,image.selected);setOpen(false)}}>
        <DialogContent>
            <img src={image.preview} className="preview-img" />
            <TextField value={msg} onChange={e=>{setMsg(e.target.value)}} name="body" fullWidth placeholder="Enter message..."/>
        </DialogContent>
        <DialogActions>
            <Button onClick={()=>{setOpen(false)}}>Close</Button>
            <Button variant="contained" type="submit">Send</Button>
        </DialogActions>
        </form>
    </Dialog>
    <Tooltip title="Send image">
      <IconButton component="label">
        <input accept="image/*" type="file" hidden onChange={handleImage}/>
        <Photo/>
      </IconButton>
    </Tooltip>
    </>
}

export default SendImage