import { getBestMove } from "../services/stockfishApi";

export async function makeBestMove(chessGame, setChessPosition) {
  const bestMove = await getBestMove(chessGame.fen());
  if (!bestMove) return;

  try {
    chessGame.move(bestMove);
    setChessPosition(chessGame.fen());
  } catch (error) {
    console.error("Error applying engine move:", error);
  }
}

export function onPieceDrop({ sourceSquare, targetSquare }, chessGame, setChessPosition) {
  if (!targetSquare) return false;

  try {
    chessGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });
    setChessPosition(chessGame.fen());

    setTimeout(() => makeBestMove(chessGame, setChessPosition), 300);
    return true;
  } catch {
    return false;
  }
}