import { useState, useRef } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard"
import { Chess } from "chess.js"
import { onPieceDrop } from "../utils/chessHandlers"

export default function Board() {
    const chessGameRef = useRef(new Chess())
    const chessGame = chessGameRef.current
    const[chessPosition, setChessPosition] = useState(chessGame.fen())

    const chessboardOptions = {
      position: chessPosition,
      onPieceDrop: (args) => onPieceDrop(args, chessGame, setChessPosition),
      id: 'play-vs-random'
    }

    return(
        <Chessboard options={chessboardOptions} />
    )
}