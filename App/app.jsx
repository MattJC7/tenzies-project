import { React, useState, useEffect } from "react";
import Die from "./die.jsx"
import { nanoid } from "nanoid"
import Confetti from "react-confetti"

export default function App() {

const [dice, setDice] = useState(allNewDice())
const [tenzies, setTenzies] = useState(false)
const [rollCount, setRollCount] = useState(0)

function generateNewDie () {
    return {
        value: Math.ceil(Math.random() * 6), 
        isHeld: false,
        id: nanoid()
    }
}

function allNewDice () {
    const diceArray = [];
    for(let i = 0; i < 10; i++){
        diceArray.push(generateNewDie())
    }
    return diceArray;
}

function rollDice () {
    if(!tenzies){
    setDice(prevDice => prevDice.map(prevDie => {
        return prevDie.isHeld ? 
        prevDie :
        generateNewDie()
    }));
    setRollCount(prevCount => prevCount + 1)
    } else {
        setTenzies(false)
        setDice(allNewDice())
        setRollCount(0)
    }
}

function holdDice (id) {
    setDice(prevDice => prevDice.map(prevDie => {
        return prevDie.id === id ? 
        {...prevDie, isHeld: !prevDie.isHeld} :
        prevDie
    }))
}

useEffect(() => { 
    const allHeld = dice.every(die => die.isHeld)
    const testValue = dice[0].value
    const allSameValue = dice.every(die => die.value == testValue)

    if(allHeld && allSameValue){
        setTenzies(true)
    }
}, [dice])

const dieElements = dice.map(die => (
    <Die value={die.value} key={die.id} isHeld={die.isHeld} onClick={() => holdDice(die.id)}/>
))

    return (
        <main className="game-bg">

            {tenzies && <Confetti />}
            <h2 className="title">Tenzies</h2>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="die-container">
                {dieElements}
            </div>
            <p className="counter">Roll <br></br> count: {rollCount}</p>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}