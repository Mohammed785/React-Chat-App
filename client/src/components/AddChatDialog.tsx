import { useEffect, useState } from "react"
import {Box, Dialog, DialogActions,DialogContent,Button, DialogContentText, DialogTitle,TextField,Alert,IconButton,Collapse} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import CloseIcon from '@mui/icons-material/Close';
import axiosClient from "../axios"
import {IRoom} from "../@types/room"
import axios from "axios";

interface Props{
    add:(room:IRoom)=>void;
    setError:({}:{isError:boolean,error:string})=>void;
    setOpen:(open:boolean)=>void;
    setAddGroup:(group:boolean)=>void;
}

function CreateGroupChat({add,setError,setOpen,setAddGroup}:Props){
    const [name,setName] = useState("")
    const [image, setImage] = useState<{ selected: File | undefined, preview: string }>({selected:undefined,preview:""})
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
                <Button onClick={()=>{setAddGroup(false)}}>Start Private</Button>
                <Button onClick={addNewConversation} variant="contained">Add</Button>
            </DialogActions>
    </>
}

function AddPrivateChat({add,setError,setOpen,setAddGroup}:Props){
    const [username,setUsername] = useState("")
    const handleClose = ()=>{
        setOpen(false)
        setUsername("")
    }
    const addPrivateChat = async()=>{
        try {
            if(!username){
                return
            }
            const {data:{room}} = await axiosClient.post(`room/create/${username}`)
            console.log(room)
            add(room)
            handleClose()
        } catch (error) {
            if(axios.isAxiosError(error)){
                const msg = (error.response?.data as Record<string ,any>).msg
                setError({isError:true,error:msg})
                console.error(error);            
            }
        }
    }
    return <>
            <DialogTitle>Start new private conversation</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter your friend username
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="username"
                    name="username"
                    label="username"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={username}
                    error={!username?true:false}
                    helperText={!username?"You must pass a username":""}
                    onChange={(e)=>setUsername(e.target.value)}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button onClick={()=>{setAddGroup(true)}}>Create group</Button>
                <Button onClick={addPrivateChat} variant="contained">Add</Button>
            </DialogActions>
    </>
}

function AddChatDialog({add}:{add:(room:IRoom)=>void}){
    const [open,setOpen] = useState(false)
    const [addGroup,setAddGroup] = useState(false)
    const [error,setError] = useState({isError:false,error:""})
    return <>
        <button className="add" onClick={(e) => {setOpen(true)}}></button>
        <div className="overlay"></div>
        <Box>
            <Dialog open={open}>
            <Collapse in={error.isError}>
                <Alert severity="error" action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={()=>setError({isError:false,error:""})}>
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }>{error.error} </Alert>
            </Collapse>
            {
                addGroup?<CreateGroupChat {...{add,setError,setOpen,setAddGroup}}/>
                :<AddPrivateChat {...{add,setOpen,setError,setAddGroup}}/>
            }
            </Dialog>
        </Box>
    </>
}

export default AddChatDialog