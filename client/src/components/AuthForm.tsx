import { ChangeEvent, FormEvent, useState,useRef } from "react"
import { Box, FormControl, TextField, Button, InputAdornment, IconButton, InputLabel, OutlinedInput, FormHelperText, Typography } from "@mui/material"
import { VisibilityOff, Visibility } from "@mui/icons-material"
import axiosClient from "../axios"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/authContext"

interface State {
    username: string,
    password: string,
    showPassword: boolean
}

function AuthForm({auth}:{auth:"login"|"register"}){
    const [values, setValues] = useState<State>({ username: "", password: "", showPassword: false })
    const [errors,setErrors] = useState({username:{isError:false,error:""},password:{isError:false,error:""}})
    const errorMsgRef = useRef<HTMLParagraphElement>(null)
    const navigate = useNavigate()
    const {loginUser} = useAuthContext()!
    const handleChange = (prop: keyof State) => (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [prop]: e.target.value })
    }
    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword })
    }
    const validateForm = ()=>{
        let newError = {...errors}
        let error = false
        if(values.username.length<2 || values.username.length>25){
            newError = { ...newError, username: { isError: true, error:"Username length must be in range 2 to 25 characters long"}}
            error = true
        }
        if(values.password.length<8 || values.password.length>30){
           newError = { ...newError, password: { isError: true, error: "Password length must be in range 8 to 25 characters long" } }
           error = true
        }
        setErrors({...newError})
        return error
    }
    const handleSubmit = async(e:FormEvent)=>{
        e.preventDefault()
        if(!validateForm()){
            try {
                const {username,password} = values
                if(auth==="login"){
                    const { data:{user} } = await axiosClient.post("/login", { username: username.trim(), password: password.trim() })
                    delete user.password
                    loginUser(user)
                    navigate("/", { replace: true })
                }else{
                    const { data } = await axiosClient.post("/register", { username: username.trim(), password: password.trim() })
                    navigate("/login", { replace: true })
                }
            } catch (error) {
                if(axios.isAxiosError(error)){
                    if(error.response?.status===401){
                        errorMsgRef.current!.innerText = "Wrong Credentials"
                    }else{
                        errorMsgRef.current!.innerText = (error.response?.data as Record<string,any>).msg
                    }
                }
            }
        }
    }
    return <>
        <Typography variant="body1" align="center" sx={{ marginBottom: "8px", color:"#d10707" }} ref={errorMsgRef}>

        </Typography>
        <form method="POST" onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <TextField label="Username" value={values.username} onChange={handleChange("username")} 
                autoComplete="username" required 
                error={errors.username.isError ? true : false}
                helperText={errors.username.isError && errors.username.error}
                />
                <FormControl error={errors.password.isError} required variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        label="Password"
                        type={values.showPassword ? "text" : "password"}
                        value={values.password}
                        error={errors.password.isError?true:false}
                        onChange={handleChange("password")}
                        endAdornment={<InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end">
                                {values.showPassword ? <VisibilityOff /> : <Visibility />}

                            </IconButton>
                        </InputAdornment>} />
                        {
                        errors.password.isError && <FormHelperText id="password-error-text">
                            {errors.password.error}
                        </FormHelperText>
                        }

                </FormControl>
                <Button variant="contained" type="submit" color="primary">{auth==="login"?"Login":"Register"}</Button>
            </Box>
        </form>
    </>
}

export default AuthForm;