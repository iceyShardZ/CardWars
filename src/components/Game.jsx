import React from "react";
import { useState,useEffect } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";

export default function Game(props)
  {

    const redirect = useNavigate();

    useEffect(() => {
      if (props.thisPlayer.length<1) {redirect("/")}
      });


    //extra functions

    function random(min,max){
       return Math.floor(Math.random()*(max+1-min)+min);
    }



    //


    var startDeck = [];

    var pcDeck = [];

    var playerDeck = [];

    for (let i = 1 ; i < 14 ; i++ ){
    
      for (let j = 0 ; j < 4 ; j++ ){
        
        let suits=["clubs","diamonds","hearts","spades"];
        startDeck.push({ rank: i,suit: suits[j] })

      }

    }

    

    for (let i = 0 ; i < 26 ; i++ ){
    
      let randomIndex = random(0,startDeck.length-1);
      playerDeck.push(startDeck.splice(randomIndex,1))
      let randomIndex2 = random(0,startDeck.length-1);
      pcDeck.push(startDeck.splice(randomIndex2,1))

    }

    
    const [GameObj, setGameObj] = useState({

      StartDeck: startDeck, PlayerDeck: playerDeck, PcDeck: pcDeck, PlayerScore: 0, PcScore: 0,

    });

    const [currentCards, setcurrentCards] = useState({ PlayerCard: playerDeck.pop() ,PCCard: pcDeck.pop()});


    //, RoundScore: this.PlayerCard>this.PCCard
    
        currentCards.Roundscore = currentCards.PlayerCard[0].rank>currentCards.PCCard[0].rank
        //usestates
        const [FinishGame, setFinishGame] = useState(false);

    const newCards = ()=>{

      setPcCardView(currentCards.PCCard[0])
      setPlayerCardView(currentCards.PlayerCard[0])

      if (GameObj.PlayerDeck.length>0){

        setcurrentCards({ PlayerCard: GameObj.PlayerDeck.pop() ,PCCard: GameObj.PcDeck.pop() })
        GameObj.PlayerScore+=(currentCards.Roundscore)*1
        GameObj.PcScore+=(!currentCards.Roundscore)*1
      }
      else{

        if (FinishGame === false){
          
          GameObj.PlayerScore+=(currentCards.Roundscore)*1;
          GameObj.PcScore+=(!currentCards.Roundscore)*1;
          setGameObj({

            StartDeck: startDeck, PlayerDeck: [], PcDeck: [],
            PlayerScore: GameObj.PlayerScore, PcScore: GameObj.PcScore,
            
            
          })
          setFinishGame(true);
        }

        
      }



    }

    const [PCSRC, setPCSRC] = useState("");
    const [playerSRC, setPlayerSRC] = useState("");

  
 

    const [PlayerCardView, setPlayerCardView] = useState({rank: "Ready",suit: <br></br>});
    const [PcCardView, setPcCardView] = useState({rank: "Ready",suit: <br></br>});


    const [ButtonValue, setButtonValue] = useState("START");
    const [declareWinner, setdeclareWinner] = useState(false);

    
    useEffect(() => {

      switch (PcCardView.suit) {
        case "spades":
          setPlayerSRC("./images/1x/spades.png");
          break;
        case "clubs":
          setPlayerSRC("./images/1x/clubs.png");
          break;
        case "hearts":
          setPlayerSRC("./images/1x/hearts.png");
          break;
        case "diamonds":
          setPlayerSRC("./images/1x/diamonds.png");
          break;

        default:
          break;
      }

      
    }, [PcCardView]);

    useEffect(() => {

      switch (PlayerCardView.suit) {
        case "spades":
          setPCSRC("./images/1x/spades.png");
          break;
        case "clubs":
          setPCSRC("./images/1x/clubs.png");
          break;
        case "hearts":
          setPCSRC("./images/1x/hearts.png");
          break;
        case "diamonds":
          setPCSRC("./images/1x/diamonds.png");
          break;

        default:
          break;
      }

      
    }, [PlayerCardView]);
    
    if (declareWinner) {

      (GameObj.PlayerScore>GameObj.PcScore) ? props.winOrLose("player Won") : props.winOrLose("player Lost");
     // (GameObj.PlayerScore>GameObj.PcScore) ?  : ;
      redirect("/result")


    }
  
    return (

      <div className="App">
        
        <br></br>
        <br></br>
        <h1>Fight!</h1>



        <div id="Cards">

              <br></br>
              <br></br>

          <div id="PC">

            <div id="PCCardContent">
              <img src={PCSRC} id="PCTopSymbol" />
              <h1>{PcCardView.rank}</h1>
              <img src={PCSRC} id="PCBottomSymbol" />
            </div>

            <div id="PCScore">
              <br></br>
              <br></br>
              <h5>PC</h5>
              <h5>Score: {GameObj.PcScore}</h5>
              <br></br>
              <br></br>
            </div>

          </div>

          <div id="Player">

            <div id="playerCardContent">
              <img src={playerSRC} id="playerTopSymbol" />
              <h1>{PlayerCardView.rank}</h1>
              <img src={playerSRC} id="playerBottomSymbol" />
            </div>

            <div id="playerScore">
              <br></br>
              <br></br>
              <h5>Player</h5>
              <h5>Score: {GameObj.PlayerScore}</h5>
              <br></br>
              <br></br>
            </div>

          </div>



      </div>

        <input type="button" id="mainButton" className="button" value={ButtonValue} onClick={ ()=>{
            
            newCards();

            if (GameObj.PlayerDeck.length<25) setButtonValue("NEXT")
            if (GameObj.PlayerDeck.length===0) setButtonValue("Final Round")
            if (ButtonValue === "Final Round") setButtonValue("FINISH!")
            if (ButtonValue === "FINISH!") {
              document.getElementById('mainButton').style.visibility = "hidden"

                if (GameObj.PlayerScore>GameObj.PcScore) {
                  
                  props.ResultMsg({msg:"You Won!", wins: props.thisPlayer[0].wins+1, losses: props.thisPlayer[0].losses})
                
                }
                else {props.ResultMsg({msg:"You Lost...", wins: props.thisPlayer[0].wins, losses: props.thisPlayer[0].losses+1})};

                setdeclareWinner(true)
            }

        }} />



      </div>

    );

  }