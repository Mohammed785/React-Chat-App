import multer from "multer"
import {join,extname} from "path"

const storage = multer.diskStorage({
    destination(req,file,callback){
        callback(null,join(__dirname,"..","public"))
    },
    filename(req,file,callback){
        const ext = extname(file.originalname)
        const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`
        callback(null,name)
    }
})

export const uploader = multer({
    storage,
    limits:{fileSize:2*1024*1024},
    fileFilter(req, file, callback) {
        if(file.mimetype==="image/png"||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"){
            callback(null,true)
        }else{
            callback(null,false)
        }

    },
})