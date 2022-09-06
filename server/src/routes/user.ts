import { Router } from "express";
import User from "../models/User";

export const userRouter = Router()

userRouter.get("/search/users",async(req,res)=>{
    const {username} = req.query
    const users = await User.find({$text:{$search:(username as string)}})
    return res.json({users})
})