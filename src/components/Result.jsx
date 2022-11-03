import React from "react";
import { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

export default function Result(props)
  {

    const redirect = useNavigate();

    useEffect(() => {
      if (props.msg.msg==="") {redirect("/")}
      });

    
    return (

      <div className="App">
        <br></br>
        <br></br>
        <div id="winMsg"><h1 key={props.msg.msg}>{props.msg.msg}</h1></div>
        <br></br>
        <br></br>
        <h1>{props.msg.losses}-{props.msg.wins}</h1>
        <br></br>
        <br></br>
        <input type="button" value="Again?" className="button" onClick={()=>redirect("/game")} />
        <br></br>
        <br></br>
        <input type="button" value="Log out" className="button" onClick={()=>{props.logOut(); redirect("/");}} />
        

      </div>

    );

  }