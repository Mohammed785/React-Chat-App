import { useState,useEffect } from "react"
import { Box } from "@mui/material"
import axiosClient from "../axios"
import Room from "./Room"
import { IRoom } from "../@types/room"
import AddChatDialog from "./AddChatDialog"

function RoomArea() {
    const [rooms,setRooms] = useState<IRoom[]>([])
    const getRooms = async()=>{
        try{    
            const {data:{rooms}} = await axiosClient.get("/room/rooms")
            setRooms(rooms)
        }catch(error){
            console.error(error)
        }
    }
    const addRoom = (room:IRoom)=>{
        setRooms([...rooms, room])
    }
    useEffect(()=>{
        getRooms()
    },[])
    return <>
    <Box component="div" className="room-area">
        {rooms && rooms.map(room =>{
            return <Room key={room._id} room={room}/>
        })}
        <AddChatDialog add={addRoom}/>
    </Box>
    </>
}

export default RoomArea;