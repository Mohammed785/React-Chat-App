import { ErrorRequestHandler } from "express";

const  ErrorHandler:ErrorRequestHandler = (err,req,res,next)=>{
    const customError = {msg:"Something went wrong try again later",status:500}
    if(err.code===11000){
        const keys = Object.keys(err.keyValue)
        if(keys.includes("username"))customError.msg="User already exists choose another username";
        else customError.msg = "Already exists"
        customError.status = 400;
    }
    if(err.name==="ValidationError"){
        const keys = Object.keys(err.errors)
        customError.msg = `Invalid ${err.errors[keys[0]].path}: ${err.errors[keys[0]].value}.`;
        if(err.errors[keys[0]] && err.errors[keys[0]].properties){
            const msg=err.errors[keys[0]].properties.message
            customError.msg = `${err.errors[keys[0]].properties.path} ${msg.split(" ").slice(3,msg.length).join(" ")}`
        }
        customError.status = 400
    }
    if (err.name === 'CastError') {
        customError.msg = `No item found with id : ${err.value}`;
        customError.status = 404;
    }
    return res.status(customError.status).json({msg:customError.msg})
}

export default ErrorHandler