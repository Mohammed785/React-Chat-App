import image from "../img.jpg"

function ChatHeader({roomName}:{roomName:string}){
    return <>
    <div className="chat-area-header">
        <img className="chat-area-profile" src={image} alt="" />
        <div className="chat-area-title">{roomName}</div>
    </div>
    </>
}

export default ChatHeader