import { useState, useRef } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard"
import { Chess } from "chess.js"
import { onPieceDrop } from "../utils/chessHandlers"

export default function Board(props) {
    const chessGameRef = useRef(new Chess(props.boardPosition))
    const chessGame = chessGameRef.current
    const[chessPosition, setChessPosition] = useState(chessGame.fen())

    const chessboardOptions = {
      position: chessPosition,
      onPieceDrop: (args) => onPieceDrop(args, chessGame, setChessPosition, props.setGameStatus, props.setWinner, props.setTime, props.startTimeRef, props.endTimeRef),
      id: 'play-vs-random'
    }

    return(
        <div style={{ width: "500px", height: "500px" }}>
            <Chessboard options={chessboardOptions} />       
        </div>
    )
}