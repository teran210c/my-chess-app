import { getBestMove } from "../services/stockfishApi";
import { Chess } from "chess.js"

export async function makeBestMove(chessGame, setChessPosition, setGameStatus, setWinner) {
  const bestMove = await getBestMove(chessGame.fen());
  if (!bestMove) return;

  try {
    chessGame.move(bestMove);

    setChessPosition(chessGame.fen());

    if (chessGame.isGameOver()) {
        setWinner("PYou lose :(")
        setGameStatus(prev => !prev)
        return true
    }
  } catch (error) {
    console.error("Error applying engine move:", error);
  }
}

export function onPieceDrop({ sourceSquare, targetSquare }, chessGame, setChessPosition, setGameStatus, setWinner) {
  if (!targetSquare) return false;

  try {
    chessGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    setChessPosition(chessGame.fen());

    if (chessGame.isGameOver()) {
        setWinner("You win!")
        setGameStatus(prev => !prev)
        return true
    }

    setTimeout(() => makeBestMove(chessGame, setChessPosition, setGameStatus, setWinner), 300);
    return true; 
  } catch {
    return false;
  }
}