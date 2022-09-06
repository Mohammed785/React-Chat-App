import { createContext, useContext, useEffect, useState } from "react";
import { IUser } from "../@types/user";

type AuthContextType = {
    user:IUser|null
    loginUser:(user:IUser)=>void
    logoutUser:()=>void
}

const AuthContext = createContext<AuthContextType|null>(null)


function AuthProvider({children}:{children:JSX.Element}){
    const [currentUser,setCurrentUser] = useState<IUser|null>(
        JSON.parse(window.localStorage.getItem("currentUser")||"null")
    )
    useEffect(()=>{
        window.localStorage.setItem("currentUser",JSON.stringify(currentUser))
    },[currentUser])
    const loginUser = (user:IUser)=>{
        setCurrentUser({...user})
    }
    const logoutUser = ()=>{
        setCurrentUser(null)
        window.localStorage.setItem("currentUser","null")
    }
    return <AuthContext.Provider value={{loginUser,logoutUser,user:currentUser}}>
        {children}
    </AuthContext.Provider>
}

const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export {useAuthContext,AuthProvider}