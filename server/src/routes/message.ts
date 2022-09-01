import { Router } from "express";
import { Types } from "mongoose";
import Message from "../models/Message";
import { compressImage, uploader } from "../utils";

export const messageRouter = Router()

messageRouter.get("/room",async(req,res)=>{
    const roomId = req.query.id
    const messages = await Message.find({room:roomId?roomId:{$exists:false,$eq:null}}).populate({path:"from",select:"avatar id username"})
    return res.json({messages})
})

messageRouter.post("/create",uploader.single("image"),async(req,res)=>{
    const roomId = req.query.id
    const {body} = req.body
    const queryObj:Record<string,any> = {from:req.user?._id}
    if(!body && !req.file){
        return res.status(400).json({msg:"Please provide a text or image message"})
    }
    if((roomId && !Types.ObjectId.isValid(roomId as string)) || !roomId){
        return res.status(400).json({msg:"Invalid room id"})
    }
    if(req.file){
        queryObj.image = req.file.filename
        await compressImage(req.file.path,req.file.filename,req.file.destination)
    }
    if(body)queryObj.body=body
    if(roomId)queryObj.room=roomId
    const message = await Message.create({...queryObj})
    return res.status(201).json({message})
})

messageRouter.post("/audio/create",uploader.single("audio"),async(req,res)=>{
    const roomId = req.query.id
    if(!req.file || req.file.mimetype!=="audio/ogg"){
        return res.status(400).json({msg:"Please provide a valid audio file"})
    }
    if((roomId && !Types.ObjectId.isValid(roomId as string)) || !roomId){
        return res.status(400).json({msg:"Invalid room id"})
    }
    const message = await Message.create({room:roomId,audio:req.file.filename,from:req.user?._id})
    return res.status(201).json({message})
})