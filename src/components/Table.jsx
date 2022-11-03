import React from "react";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';

export default function Table(props)
  {

    const redirect = useNavigate();


    if (props.PlayerList.length>0){
      return(
      <div className="App" style={{textAlign: 'center'}}>
    <table id="PlayerTable" style={{textAlign: 'center'}}>
    <tr>
      <th>Player Name</th>
      <th>Wins</th>
      <th>Losses</th>
      <th>total games</th>
    </tr>
    {props.PlayerList.map(p=>{
      return(
    <tr>
      <td>{p.PlayerName}</td>
      <td>{p.wins}</td>
      <td>{p.losses}</td>
      <td>{p.games}</td>
    </tr>

    )})}

  </table>
  </div>
  )}

    return (

      <div className="App">
        
        <br></br>
        <br></br>
        <h3>No players registered</h3>



      </div>

    );

  }

  //<input onChange={(e)=>settitle(e.target.value)} placeholder="Enter Name" />