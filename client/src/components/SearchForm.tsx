import { Search } from "@mui/icons-material"
import { Box, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material"
import { FormEvent, useState } from "react"
import { IRoom } from "../@types/room"

function SearchForm({rooms,setRooms}:{rooms:IRoom[],setRooms:(rooms:IRoom[])=>void}){
    const [search,setSearch] = useState("")
    const filterRooms = (e:FormEvent)=>{
        e.preventDefault()
        setRooms(rooms.map(room=>{
            if(room.is_group){
                return {...room,filter:room.name.includes(search)}
            }
            else{
                const friendIdx = room.members[0].member?0:1
                return {...room,filter:room.members[friendIdx].member.username.includes(search)} 
            }
        }))
    }
    return <>
        <Box component="div" className="search-bar">
            <form method="post" onSubmit={filterRooms}>
                <TextField variant="standard" fullWidth value={search} onChange={(e)=>{setSearch(e.target.value)}} label="Search..." InputProps={{endAdornment:<InputAdornment position="end">
                    <Tooltip title="Search">
                        <IconButton type="submit">
                            <Search/>
                        </IconButton> 
                    </Tooltip>
                </InputAdornment>}} />
            </form>
        </Box>
    </>
}

export default SearchForm