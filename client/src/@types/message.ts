export interface IMessage{
    _id:string;
    from:{avatar:string,_id:string,username:string};
    room:string;
    body:string;
    createdAt:string;
    search:boolean;
    image?:string
    uploadedImg?:boolean
}