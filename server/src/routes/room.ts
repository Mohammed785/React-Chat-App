import { Router } from "express";
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
            await room.populate("members.member")
        }
        
    }
    return res.json({rooms})
})

roomRouter.get("/:id/check-exists", async (req, res) => {
    const friendId = req.params.id;
    const room = await Room.findOne({members:{$elemMatch:{
        member:{$all:[friendId,req.user?._id]}
    }}});
    return res.json({room})
});

roomRouter.post("/create/:id",async(req,res)=>{
    const {id} = req.params
    const friend = await User.findById(id)
    if(!friend){
        return res.status(404).json({msg:"User not found!!"})
    }
    const room = await Room.create({members:[{member:req.user?._id},{member:friend._id}]})
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

roomRouter.post("/join",async(req,res)=>{
    const {roomId,userId} = req.query
    const room = await Room.findByIdAndUpdate(roomId,{$push:{members:{member:userId}}})
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