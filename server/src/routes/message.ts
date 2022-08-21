import { Router } from "express";
import Message from "../models/Message";

export const messageRouter = Router()


messageRouter.get("/room",async(req,res)=>{
    const roomId = req.query.id
    let messages = [];
    if(roomId){
        messages = await Message.find({room:roomId})
    }else{
        messages = await Message.find({room:undefined})
    }
    return res.json({messages})
})

messageRouter.post("/create",async(req,res)=>{
    const roomId = req.query.id
    const {body} = req.body
    if(!body){
        return res.status(400).json({msg:"Please provide a message"})
    }
    const message = await Message.create({room:roomId,body,from:req.user?._id})
    return res.status(201).json({message})
})

