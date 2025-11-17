"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation";
import Board from "../../../../../Components/Board"

export default function level1() {
    const [gameStatus, setGameStatus] = useState(false)
    const [winner, setWinner] = useState("")
    const [score, setScore] = useState(0)
    const startTimeRef = useRef(null)
    const endTimeRef = useRef(null)
    const countBestMoves = useRef(0) 
    const router = useRouter()

   
    const positionMate1 = "8/8/8/4k3/8/8/8/4K2R w - - 0 1"
   
    return (
        <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>hello from level 1</p>
            <Board 
                boardPosition={positionMate1} 
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
                <button onClick={() => router.push(`/board/level-1/exercise-2`)}>Continue</button>
            </div>}
        </div>
    )
}