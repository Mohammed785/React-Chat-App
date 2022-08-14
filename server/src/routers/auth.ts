import {Router} from "express"
import passport from "passport"
import User from "../models/User"

export const authRouter = Router()


authRouter.post("/login",passport.authenticate("local"),(req,res)=>{ 
    return res.json({user:req.user})
})

authRouter.post("/register",async(req,res)=>{
    const {username,password} = req.body
    if(!username || !password){
        return res.status(400).json({msg:"Please provide username and password"})
    }
    const user = await User.create({username,password})
    return res.status(201).json({user})
})

authRouter.post("/logout",async(req,res)=>{
    if(!req.isAuthenticated()){
        return res.status(401).json({msg:"You are already logged out"})
    }
    req.logout((err)=>{
        if(err){
            return res.status(500).json({msg:"Something went wrong"})
        }
    });
    return res.json({msg:"Logged out"})
})
