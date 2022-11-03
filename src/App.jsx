
import './App.css';
import { useState,useEffect } from 'react';
import Home from './components/Home'
import Game from './components/Game'
import Result from './components/Result'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";




function App() {





  const [PlayerWonLastGame, setPlayerWonLastGame] = useState(false);
  const [PlayerList, setPlayer] = useState([]);
  const [currentPlayer, setcurrentPlayer] = useState('');

  const newPlayer = (name) => {

    setPlayer([{PlayerName:name,wins:0,losses:0,games:0},...PlayerList])
    setcurrentPlayer([{PlayerName:name,wins:0,losses:0,games:0}]);
    

  }

  const setCurrentPlayerObj = (name) =>
  {

    setcurrentPlayer(PlayerList.filter( p => p.PlayerName === name ));

  }

  const addPlayerResult = async(winOrLose) =>{

    if (winOrLose === "player Won"){
    await setPlayer((PlayerList.map(p =>{

      if (p.PlayerName === currentPlayer[0].PlayerName){
        p.wins +=0.5;
        p.games +=0.5;
      }
      return p

    })));

    setcurrentPlayer((PlayerList.filter(p => p.PlayerName === currentPlayer[0].PlayerName)))
      
    }
  
    if (winOrLose === "player Lost"){
      await setPlayer((PlayerList.map(p =>{
  
        if (p.PlayerName === currentPlayer[0].PlayerName){
          p.losses +=0.5;
          p.games +=0.5;
        }
        return p
  
      })));
  
      setcurrentPlayer((PlayerList.filter(p => p.PlayerName === currentPlayer[0].PlayerName)))
        
    }


  }

  const logOut = () =>
  {

    setcurrentPlayer([]);

  }


  const [endMsg, setEndMsg] = useState({msg: "", wins: 0, losses: 0});

  const ResultMsg = (msg) => {

    setEndMsg(msg)

  }

  
  const updateWinner = (res) =>{

    setPlayerWonLastGame(res)

  }


  return (

    <Router>
    <Routes>
      
      <Route path="/" element={<Home addPlayer={newPlayer} currentPlayer={setCurrentPlayerObj} PlayerList={PlayerList}/>} />
      <Route path="/game" element={<Game ResultMsg={ResultMsg} updateWinner = {updateWinner} winOrLose={addPlayerResult} thisPlayer={currentPlayer}/>} />
      <Route path="/result" element={<Result msg={endMsg} whowon={PlayerWonLastGame} logOut={logOut}/>} />
      
    </Routes>

    <img src="./images/1x/redPattern.png" id='BG1'/>
    <img src="./images/1x/redPattern.png" id='BG2'/>
    
    </Router>
    
  );

}

export default App;

/*
      <Route path="/game" element={<Game/>} />
      <Route path="/result" element={<Result/>} />
*/

/*
    { PlayerList.map((p)=>{

        return (<h1>Hello?</h1>)

      })}
    
*/

/*
<Home addPlayer={newPlayer} currentPlayer={setCurrentPlayerObj} PlayerList={PlayerList}/>
*/