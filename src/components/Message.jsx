import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';

export default function Message(props)
  {

    

    return (

      <div className="App">
        
        <div id="msgDiv" style={{display: `${props.display}`}}>
        <h3 style={{fontSize: "20px", fontWeight: "bold"}} id="msgText">{props.text}</h3>
        <input type="button" value="OK" className="whiteButton" onClick={()=>{

         document.getElementById('msgDiv').style.display="none"

        }}/>
        </div>


      </div>

    );

  }

  //<input onChange={(e)=>settitle(e.target.value)} placeholder="Enter Name" />