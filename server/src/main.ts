import {config} from "dotenv"
config()
import express from "express"
import { connect } from "mongoose"

const app = express()




const start = async()=>{
    try {
        await connect(process.env.MONGO_URI)
        app.listen(8000,()=>console.log("[SERVER] Started"))
    } catch (error) {
        console.error(error);        
    }
}

start()