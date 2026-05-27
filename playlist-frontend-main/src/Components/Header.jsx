import React from "react";
import './header.css';
import Logoimage from '../images/tcs pace logo black.png';


export default function Header(){
    return(
        
        <header className="header">  
        <div className="header-left">  
          <img src={Logoimage} alt="Hello" style={{width: 140}} />  
        </div>  
        <div className="header-center">  
          <span className="span">NEW SESSION UPLOAD</span>  
        </div>  
        <div className="header-right"></div>  
      </header> 
    );
}