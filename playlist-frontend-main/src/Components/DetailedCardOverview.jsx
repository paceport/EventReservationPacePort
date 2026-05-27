import React from "react";
import './Mainfile.css';
import crossImage from '../images/Reject.png';
import { useNavigate } from "react-router-dom";
import DetailedPage from "./DetailedPage";

export default function DetailedCardOverview(){

     let navigate = useNavigate();
     function onClose(){
        navigate('/');
     }
    return(
        <div className='main'>
        <div className='background-image'></div>
            <div className='preview-card' style={{paddingTop: 10}}>
                <div style={{float: "right", marginRight: '50px'}}>
                 <img src= {crossImage} alt="Hello" style={{width: '30px', height: '30px'}} onClick={onClose} />
                 </div>
                 <div style={{ justifyContent: "center"}}>
               <h4 className="preview-text">PREVIEW</h4>  
               <p className="preview-p">Previewing how your Detailed Page may look upon publishing on TCS Playlist</p>
               </div>
                  <DetailedPage />
                
             </div>
        </div>
    );
}