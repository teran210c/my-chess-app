"use client"

import { useState, useRef } from "react";
import Board from "../../../../Components/Board"

export default function level1() {
    const [gameStatus, setGameStatus] = useState(false)
    const [winner, setWinner] = useState("")
    const [time, setTime] = useState(0)
    const startTimeRef = useRef(null)
    const endTimeRef = useRef(null)

    const positionMate1 = "7K/8/r5k1/8/8/8/8/8 w - - 0 1"
   
    return (
        <div style={{position: "relative", display: "flex", flexDirection: "column", alignItems: "center"}}>
            <p>hello from level 1</p>
            <Board boardPosition={positionMate1} setGameStatus={setGameStatus} setWinner={setWinner} setTime={setTime} startTimeRef={startTimeRef} endTimeRef={endTimeRef}/>
            {gameStatus && <div style={{position: "absolute", top: "50%", right: "50%", transform: "translate(50%, -50%)", background: "white"}}>
                <p>{winner} {time}</p>
            </div>}
        </div>
    )
}