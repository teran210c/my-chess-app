"use client"

import Board from "../../../../Components/Board"

export default function level1() {
    const fenMate1 = "7k/8/8/8/8/8/8/R6K w - - 0 1"
    return (
        <>
            <p>hello from level 1</p>
            <Board initialPosition={fenMate1}/>
        </>
    )
}