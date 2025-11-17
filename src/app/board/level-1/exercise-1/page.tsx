"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Board from "../../../../../Components/Board"

export default function level1() {
    const [gameStatus, setGameStatus] = useState(false)
    const [winner, setWinner] = useState("")
    const [score, setScore] = useState(0)
    const [index, setIndex] = useState(0)
    const startTimeRef = useRef(null)
    const endTimeRef = useRef(null)
    const countBestMoves = useRef(0) 
   
    const positions = [
        "7k/8/R5K1/8/8/8/8/8 w - - 0 1",
        "8/8/8/4k3/8/8/8/4K2R w - - 0 1"
    ]

    function handleContinue() {
        setIndex(prevIndex => prevIndex + 1)
        setGameStatus(prev => !prev)
        setWinner("")
        setScore(0)
        startTimeRef.current = null
        endTimeRef.current = null
        countBestMoves.current = 0        
    }
   
    return (
        <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>hello from level 1</p>
            <Board 
                key={index}
                boardPosition={positions[index]} 
                setGameStatus={setGameStatus} 
                setWinner={setWinner} 
                setScore={setScore} 
                startTimeRef={startTimeRef} 
                endTimeRef={endTimeRef}
                countBestMoves={countBestMoves}
                
            />
            {gameStatus && <div style={{position: "absolute", top: "50%", right: "50%", transform: "translate(50%, -50%)", background: "white"}}>
                <p>{winner}</p>
                <p>{score}</p>
                <button onClick={handleContinue}>Continue</button>
            </div>}
        </div>
    )
}