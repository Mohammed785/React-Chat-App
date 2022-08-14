import { PassportStatic } from "passport";
import { Strategy } from "passport-local";
import User from "../models/User";

export default function(passport:PassportStatic){    
    passport.serializeUser(function(user,cb){
        return cb(null,user._id)
    })
    passport.deserializeUser(function(id,cb){
        User.findById(id).then(user=>{
            if(user){
                return cb(null,user)
            }
        }).catch(err=>{
            return cb(err)
        })
    })
    passport.use(new Strategy(function (username, password, cb) {
        User.findOne({ username }).then(user=>{
            if (!user) {
                return cb(null, false,{message:"Invalid username or password"});
            }
            user.comparePasswords(password).then(isMatch=>{
                if(isMatch){
                    return cb(null,user)
                }
                return cb(null,false,{message:"Invalid username or password"})
                
            })
        }).catch((err)=>{
            cb(err)
        })
    }));
}