import {useState} from "react";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import GroupIcon from '@mui/icons-material/Group';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useChatContext } from "../context/chatContext";
import axiosClient from "../axios";
import { IUser } from "../@types/user";
import { useAuthContext } from "../context/authContext";

function GroupMembers(){
    const [members, setMembers] = useState<{ member: IUser, privilege:string}[]>([])
    const [open,setOpen] = useState(false)
    const [isAdmin,setIsAdmin] = useState(false)
    const {selectedRoom} = useChatContext()
    const {user}=useAuthContext()!
    const loadMembers = async()=>{
        if(!members.length){
            try{
                const {data:{members}} = await axiosClient.get(`room/${selectedRoom?._id}/members`)
                checkAdmin(members)                             
                setMembers(members)
            }catch(e){
                console.log(e)
            }
        }
        setOpen(true)
    }
    const checkAdmin = (members: { member: IUser, privilege: string }[])=>{   
        const member = members.filter(mem => {
            return mem.member._id === user!._id
        })     
        if(member.length && member[0].privilege==="Admin") setIsAdmin(true)
    }
    const kickMember = async(id:string)=>{
        if(isAdmin){
            try{               
                await axiosClient.delete(`room/${selectedRoom?._id}/kick/${id}`)
                setMembers(members.filter(mem=>{
                    return mem.member._id!==id
                }))
            }catch(e){
                console.log(e)
            }
        }
    }
    return <>
    <div className="details-photos">
        <Tooltip title="Members">
            <Button onClick={loadMembers} variant="contained" fullWidth sx={{marginBottom:"15px"}}>
                <GroupIcon/>
                Members
            </Button>
        </Tooltip>
        <Dialog open={open} onClose={()=>{setOpen(false)}} scroll="paper">
            <DialogTitle>
                {selectedRoom?.name} Members
            </DialogTitle>
            <DialogContent dividers={true}>
                {members.map(member=>{
                    if(member.member._id!==user!._id){
                        return <div key={member.member._id} className="member">
                            <div className="m-info">
                                <img src={process.env.REACT_APP_STATIC_PATH + "avatars/" + member.member.avatar} alt="avatar" />
                                <p>{member.member.username}</p>
                            </div>
                            {isAdmin&& <Button color="error" onClick={async(e)=>{await kickMember(member.member._id)}} variant="contained">
                                Kick
                            </Button>}
                        </div>
                    }
                })}
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={()=>{setOpen(false)}}>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    </>
}

export default GroupMembers;