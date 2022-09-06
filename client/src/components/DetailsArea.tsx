import ChatDetails from "./ChatDetails"
import SharedPhotos from "./ChatSharedPhotos";
import SearchInChat from "./SearchInChat";

function DetailsArea(){
    return <>
    <div className="detail-area">
        <ChatDetails/>
        <div className="detail-changes">
            <SearchInChat/>
        </div>
           <SharedPhotos/>
    </div>
    </>
}

export default DetailsArea;