import { useEffect, useState } from "react"
import {Box, Dialog, DialogActions,DialogContent,Button, DialogContentText, DialogTitle,TextField,Alert,IconButton,Collapse} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from "../axios"
import {IRoom} from "../@types/room"

function AddChatDialog({add}:{add:(room:IRoom)=>void}){
    const [open,setOpen] = useState(false)
    const [name,setName] = useState("")
    const [image, setImage] = useState<{ selected: File | undefined, preview: string }>({selected:undefined,preview:""})
    const [error,setError] = useState({isError:false,error:""})
    const addNewConversation = async()=>{
        if(name){
            try{
                if(!image.selected||name.length<2){
                    setError({isError:true,error:"Please provide image and name"})
                    return
                }
                const data = new FormData()
                data.append("name",name)
                data.append("image",image.selected!)
                const { data: { room } } = await axiosClient.post("/room/group/create",data)
                handleClose()
                add(room)
            }catch(error){
                console.error(error)
            }
        }
    }
    const handleImageChange = (filesList:FileList|null)=>{
        if(filesList){
            setImage({...image,selected:filesList[0]})
        }else{
            setImage({...image,selected:undefined})
        }
    }
    const handleClose = ()=>{
        setName("")
        setImage({selected:undefined,preview:""})
        setOpen(false)
    }
    useEffect(()=>{
        const url = image.selected ? URL.createObjectURL(image.selected):""
        setImage({...image,preview:url}) 
        return ()=>URL.revokeObjectURL(image.preview)
    },[image.selected])
    return <>
        <button className="add" onClick={(e) => {setOpen(true)}}></button>
        <div className="overlay"></div>
        <Box>
            <Dialog open={open} onClose={handleClose}>
            <Collapse in={error.isError}>
                <Alert severity="error" action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={()=>setError({isError:false,error:""})}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }>{error.error} </Alert>
            </Collapse>
                <DialogTitle>Create new group Conversation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter group name and image
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="name"
                        label="name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        error={name.length<2}
                        helperText={name.length<2?"Name length can't be less than 2 characters":""}
                        onChange={(e)=>setName(e.target.value)}/>
                    <Box 
                    component="div" sx={{display:"flex",alignItems:"center"}}>
                        <Button variant="contained" endIcon={<PhotoCamera />} component="label" sx={{marginTop:"6px"}}>
                            Upload Image
                            <input hidden onChange={(e)=>{handleImageChange(e.target.files)}} accept="image/*" multiple type="file" />
                        </Button>
                        {image.preview && <img src={image.preview} style={{width:"150px"}}/>}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    <Button onClick={addNewConversation} variant="contained">Add</Button>
                </DialogActions>
            </Dialog>
        </Box>
    </>
}

export default AddChatDialog