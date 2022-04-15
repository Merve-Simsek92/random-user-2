import React from 'react'
import design from "./assets/design.svg";
import "./App.css"
const Footer = () => {
  return (
    <div className="footer">
        {"<MERVE/>"}<img style={{position:"relative", top:"20px"}} src={design}/>{"design"}
    </div>
  )
}

export default Footer