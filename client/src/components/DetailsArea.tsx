import ChatDetails from "./ChatDetails"
import SharedPhotos from "./ChatSharedPhotos";
import SearchInChat from "./SearchInChat";
import GroupMembers from "./GroupMembers";

function DetailsArea(){
    return <>
    <div className="detail-area">
        <ChatDetails/>
        <div className="detail-changes">
            <SearchInChat/>
        </div>
        <GroupMembers/>
        <SharedPhotos/>
    </div>
    </>
}

export default DetailsArea;