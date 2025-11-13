import { useState, useRef } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard"
import { Chess } from "chess.js"

export default function Board() {
    const chessGameRef = useRef(new Chess());
    const chessGame = chessGameRef.current;

    const[chessPosition, setChessPosition] = useState(chessGame.fen())


    function makeRandomMove () {
        const possibleMoves = chessGame.moves()

        if (chessGame.isGameOver()) {
            return
        }

        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)]

        chessGame.move(randomMove)

        setChessPosition(chessGame.fen())
    }

    function onPieceDrop(PieceDropHandlerArgs) {
        if (!PieceDropHandlerArgs.targetSquare) {
            return false
        }
        try {
            chessGame.move({
                from: PieceDropHandlerArgs.sourceSquare,
                to: PieceDropHandlerArgs.targetSquare,
                promtion: 'q'
            })
            setChessPosition(chessGame.fen())

            setTimeout(makeRandomMove, 300);

            return true
        } catch {
            return false
        }
    }

    const chessboardOptions = {
      position: chessPosition,
      onPieceDrop,
      id: 'play-vs-random'
    }

    return(
        <Chessboard options={chessboardOptions} />
    )
}