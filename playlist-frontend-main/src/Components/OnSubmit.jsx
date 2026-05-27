import React from "react";
import './Mainfile.css';
import sumbitImage from '../images/T.png';
import { useNavigate } from "react-router-dom";

function OnSubmit(){

let navigate = useNavigate();
function handleClick(){

    navigate('/');
}
    return(
        <div className='main'>
          <div className='background-image'></div>
           <div className='on-submit'>
               <img src={sumbitImage} alt="hello" style={{width: '30%', height:'40%'}} />
                   <h1 className="thankyou">Thank You</h1>
                    <h4 style={{padding: '5px 0 10px 0', fontFamily: 'Calibri', fontWeight: "bold",letterSpacing: ' 0.02px',
                        color: '#1E1E1B', fontSize: 20}}
                    >Your new session upload is complete</h4>
                    <button className="button" onClick={handleClick}>Upload another session</button>
            </div>
        </div>
    );
}

export default OnSubmit;