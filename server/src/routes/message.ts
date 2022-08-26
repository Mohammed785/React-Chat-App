import { Router } from "express";
import { Types } from "mongoose";
import Message from "../models/Message";

export const messageRouter = Router()


messageRouter.get("/room",async(req,res)=>{
    const roomId = req.query.id
    const messages = await Message.find({room:roomId?roomId:{$exists:false,$eq:null}}).populate({path:"from",select:"avatar id username"})
    return res.json({messages})
})

messageRouter.post("/create",async(req,res)=>{
    const roomId = req.query.id
    const {body} = req.body
    if(!body){
        return res.status(400).json({msg:"Please provide a message"})
    }
    if(roomId && !Types.ObjectId.isValid(roomId as string)){
        return res.status(400).json({msg:"Invalid room id"})
    }
    const message = await Message.create({room:roomId?roomId:null,body,from:req.user?._id})
    return res.status(201).json({message})
})
