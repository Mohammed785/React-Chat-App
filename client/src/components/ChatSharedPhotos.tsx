import Image from "@mui/icons-material/Image";
import Button from "@mui/material/Button";

function SharedPhotos(){
    return <>
     <div className="detail-photos">
               <div className="detail-photo-title">
                  <Image/>
                  Shared photos
               </div>
               <div className="detail-photo-grid">
                  
               </div>
               <Button variant="text" className="view-more">
               View More
               </Button>
               
            </div>
    </>
}

export default SharedPhotos;