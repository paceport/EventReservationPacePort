import React from "react";
import './Mainfile.css';
import crossImage from '../images/Reject.png';
import { useNavigate } from "react-router-dom";
import BasicExample from "./CardPreview";

export default function CardOverview(){

     let navigate = useNavigate();
     function onClose(){
        navigate('/');
     }
    return(
        <div className='main'>
        <div className='background-image'></div>
            <div className='preview-card'>
                <div style={{float: "right", marginRight: '50px'}}>
                 <img src= {crossImage} alt="Hello" style={{width: '30px', height: '30px'}} onClick={onClose} />
                 </div>
                 <div style={{ marginTop: 20, justifyContent: "center"}}>
               <h4 className="preview-text">PREVIEW</h4>  
               <p className="preview-p">Previewing how your Display Card may look upon publishing on TCS Playlist</p>
               </div>
                    <div style={{width: '100%', justifyContent: "center", display: 'flex'}}>
                  <BasicExample />
                  </div>
             </div>
        </div>
    );
}