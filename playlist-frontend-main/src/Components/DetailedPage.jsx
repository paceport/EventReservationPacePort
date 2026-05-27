import React from "react";
import './detailpage.css';
import { useLocation } from "react-router-dom";


// const ImagePreview = {
//   display: "flex",
//   maxWidth: "100%",
//   maxHeight: "50%",
//   margin: "20px",
//   borderRadius: "2px",
//   borderBottom: "2px ",
//   backgroundColor:  'black'
// };

export default function DetailedPage(){
    const location = useLocation();
  const { bannerDetailedText ,previewImage, duration,  } = location.state;

    return(
        <div className="main-page">
           <div className="page">
               <img src= {previewImage} alt=""  
               style={{width: '100%', height: '40%', backgroundColor: 'black', borderTopRightRadius: '16px', borderTopLeftRadius: '16px'}}
               /> 
                {/* <video src={previewVideo}></video> */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',  width: '100%' }}>  
                     <h5 style={{ marginLeft: '16px',letterSpacing: '0.43px', fontFamily:"Calibri", fontSize: '20px',fontWeight: '600' }}>Overview</h5>  
                     <h6 
                     style={{ marginRight: '16px', color: '#DD5041',letterSpacing: '0.43px', fontFamily:"Calibri", fontSize: '12px',fontWeight: 'bold' }}>
                        {duration} mins</h6>  
                </div>
               <p>{bannerDetailedText}</p>
            </div>
        </div>
    );
}