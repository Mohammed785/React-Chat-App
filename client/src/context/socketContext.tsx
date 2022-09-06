import { createContext, useContext, useState,ReactNode, useEffect, useRef } from "react";
import io,{Socket} from "socket.io-client"
import { useAuthContext } from "./authContext";
interface ISocketContext{
    socket:Socket|null
    setSocket:(socket:Socket|null)=>void
}

const SocketContext = createContext<ISocketContext>({socket:null,setSocket(socket){}})

function SocketProvider({children}:{children:ReactNode}){
    const {user} = useAuthContext()!
    const [socket,setSocket] = useState<Socket|null>(io("http://localhost:8000",{reconnection:false}))
    const timeRef = useRef<NodeJS.Timeout|null>(null)
    useEffect(()=>{
        user&&socket?.emit("connected",(user._id))
        function handleConnectErrors(){  
            timeRef.current && clearTimeout(timeRef.current)
            timeRef.current =  setTimeout(()=>{
                socket?.connect()
            },5000)
        }
        socket?.on("connect_error",handleConnectErrors)
        return ()=>{socket?.off("connect_error",handleConnectErrors)}
    },[user])
    return <SocketContext.Provider value={{socket,setSocket}}>
        {children}
    </SocketContext.Provider>
}



const useSocketContext = ()=>{
    return useContext(SocketContext)
}

export {SocketProvider,useSocketContext}