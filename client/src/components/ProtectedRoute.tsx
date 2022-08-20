import { Navigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"

function ProtectedRoute({children}:{children:JSX.Element}){
    const {user} = useAuthContext()!
    if(!user){
        return <Navigate to="/login" replace/>
    }
    return children
}

export default ProtectedRoute
