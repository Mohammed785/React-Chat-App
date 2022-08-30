import multer from "multer"
import {join,extname,resolve} from "path"
import sharp from "sharp"

const storage = multer.diskStorage({
    destination(req,file,callback){
        const path = req.baseUrl==="/message"?"messages":"avatars"
        callback(null,join(__dirname,"..","public",path))
        
    },
    filename(req,file,callback){
        const ext = extname(file.originalname)
        const name = `${req.baseUrl==="/message"?"message":"avatar"}-${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`
        callback(null,name)
    }
})

export const uploader = multer({
    storage,
    limits:{fileSize:4*1024*1024},
    fileFilter(req, file, callback) {
        if(file.mimetype==="image/png"||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"||file.mimetype==="audio/ogg"){
            callback(null,true)
        }else{
            callback(null,false)
        }

    },
})

export const compressImage = async(path:string,filename:string,destination:string,maxWidth=800,maxHeight=800)=>{
    const meta = await sharp(path).metadata()
    if(meta.width!>maxWidth||meta.height!>maxHeight){
        const ratio = Math.min(maxWidth/meta.width!,maxHeight/meta.height!)||1;
        sharp(await sharp(path)
        .resize(Math.round(ratio*meta.width!),Math.round(ratio*meta.height!))
        .toFormat("jpeg",{force:true})
        .jpeg({quality:80})
        .toBuffer()
        ).toFile(resolve(destination,filename))
    }
}