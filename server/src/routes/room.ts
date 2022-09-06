import { Router } from "express";
import Message from "../models/Message";
import Room from "../models/Room";
import User from "../models/User";
import { uploader } from "../utils"

export const roomRouter = Router();

roomRouter.get("/rooms",async(req,res)=>{
    const rooms = await Room.find({members:{$elemMatch:{
        member:req.user?._id
    }}})
    for (const room of rooms) {
        if(!room.is_group){
            await room.populate({path:"members.member",match:{_id:{$ne:req.user?._id}}})
        }
        
    }
    return res.json({rooms})
})

roomRouter.get("/:id/chat", async (req, res) => {
    const friendId = req.params.id;
    const room = await Room.findOne({is_group:false,"members.member":{$all:[friendId,req.user?._id]}})
    return res.json({room})
});

roomRouter.post("/create/:username",async(req,res)=>{
    const {username} = req.params
    const friend = await User.findOne({username})
    if(username===req.user?.username){
        return res.status(400).json({msg:"You can't chat with yourself "})
    }
    if(!friend){
        return res.status(404).json({msg:"User not found!!"})
    }
    const exists = await Room.findOne({is_group:false,"members.member":{$all:[friend._id,req.user?._id]}})
    if(exists){
        return res.status(400).json({msg:"Private chat already exists"})
    }
    const room = await (await Room.create({members:[{member:req.user?._id},{member:friend._id}]})).populate({path:"members.member",match:{_id:{$ne:req.user?._id}}})
    return res.status(201).json({room,friend})
})

roomRouter.post("/group/create", uploader.single("image"), async (req, res) => {
    const { name } = req.body;
    if (!name || !req.file) {
        return res.status(400).json({ msg: "Please provide name and image" });
    }
    const room = await Room.create({
        name,
        avatar: req.file!.filename,
        members: [{ member: req.user?._id, privilege: "Admin" }],
        is_group: true,
    });
    return res.json({ room });
});

roomRouter.post("/:id/join",async(req,res)=>{
    const {id} = req.params
    const room = await Room.findOneAndUpdate({_id:id,"members.member":{$ne:req.user?._id}},{$push:{members:{member:req.user?._id}}})
    if(!room){
        return res.status(400).json({msg:"Already A Member or group not found"});
    }
    return res.json({room})
})

roomRouter.get("/:id/members",async(req,res)=>{
    const roomId = req.params.id
    const room = await Room.findById(roomId).populate("members.member")
    if(!room){
        return res.status(404).json({msg:"Room not Found"})
    }
    const members = room.members
    return res.json({members})
})

roomRouter.delete("/:id/leave",async(req,res)=>{
    const roomId = req.params.id
    const room = await Room.findByIdAndUpdate(roomId,{$pull:{members:{member:req.user?._id}}},{new:true})
    return res.json({room})
})

roomRouter.get("/:id/images",async(req,res)=>{
    const images = (await Message.find({image:{$exists:true}}).select("image")).map(img=>img.image)
    return res.json({images})
})