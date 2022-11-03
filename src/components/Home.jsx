import React from "react";
import { useState } from 'react';
import Table from './Table'
import Message from './Message'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

export default function Home(props)
  {

    const redirect = useNavigate();

    
  const [msgDisplay, setmsgDisplay] = useState("none");
  const [msgText, setmsgText] = useState("Username Invalid!");

    return (

      <div className="App">
        
        <br></br>
        <br></br>
        <h1>Ready for War</h1>
        <br></br>
        <br></br>
        <input type="text" id="playerNameField" placeholder="Enter Your Name" style={{marginRight: "15px"}}/>
        <input className="button" type="button" value="LOGIN" onClick={()=>{

            var fieldText = document.getElementById("playerNameField").value;

            if (fieldText!=='' && fieldText.length>2) {
                

                
                if (props.PlayerList.filter( p => p.PlayerName === fieldText).length<1){
                
                    props.addPlayer(fieldText)

                    redirect("/game")
                }

                else
                {

                    props.currentPlayer(fieldText)
                    
                    redirect("/game")

                }
                
            } 
            else{
              setmsgDisplay("block")
            }
            

        }} />
        <br></br>
        <br></br>
        <br></br>
        <Table PlayerList={props.PlayerList} />
        <Message display={msgDisplay} text={msgText}/>
      </div>

    );

  }

  //<input onChange={(e)=>settitle(e.target.value)} placeholder="Enter Name" />