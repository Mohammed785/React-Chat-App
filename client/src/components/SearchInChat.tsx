import { InputBase, IconButton,InputAdornment, Tooltip } from "@mui/material"
import Search from "@mui/icons-material/Search"
import { FormEvent, useState } from "react"
import { useChatContext } from "../context/chatContext"

function SearchInChat(){
    const {msgs,setMsgs} = useChatContext()
    const [search,setSearch] = useState("")
    const handleSearch = (e:FormEvent)=>{
        e.preventDefault()
        console.log("SUBM")
        setMsgs(msgs.map(msg=>{
            return {...msg,search:msg.body.includes(search)}
        }))
    }
    return <>
    <form method="post" onSubmit={handleSearch}>
        <InputBase className="detail-change" placeholder="Search in Chat" fullWidth  value={search} onChange={(e)=>{setSearch(e.target.value)}} endAdornment={<InputAdornment position="end">
            <Tooltip title="Search">
                <IconButton type="submit">
                    <Search/>
                </IconButton> 
            </Tooltip>
            </InputAdornment>}/>
    </form>
    </>
}

export default SearchInChat