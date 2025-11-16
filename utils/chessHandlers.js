import { useState, useRef } from "react";
import { getBestMove } from "../services/stockfishApi";
import { Chess } from "chess.js"

export async function makeBestMove(chessGame, setChessPosition, setGameStatus, setWinner, setTime, startTimeRef, endTimeRef) {

  const bestMove = await getBestMove(chessGame.fen());
  if (!bestMove) return;

  try {
    chessGame.move(bestMove);

    setChessPosition(chessGame.fen());

    if (chessGame.isGameOver()) {
        setWinner("You lose :(")
        endTimeRef.current = Date.now()
        setTime(prev => prev = Math.trunc((endTimeRef.current - startTimeRef.current)/1000))
        setGameStatus(prev => !prev)
        return true
    }
  } catch (error) {
    console.error("Error applying engine move:", error);
  }
}

export function onPieceDrop({ sourceSquare, targetSquare }, chessGame, setChessPosition, setGameStatus, setWinner, setTime, startTimeRef, endTimeRef) {
    
  if (!targetSquare) return false;

  try {
    chessGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    
    setChessPosition(chessGame.fen());

        if(startTimeRef.current === null) {
            startTimeRef.current = Date.now()
        }

    if (chessGame.isGameOver()) {
        setWinner("You win!")
        endTimeRef.current = Date.now()
        setTime(prev => prev = Math.trunc((endTimeRef.current - startTimeRef.current)/1000))
        setGameStatus(prev => !prev)
        return true
    }

    setTimeout(() => makeBestMove(chessGame, setChessPosition, setGameStatus, setWinner, setTime, startTimeRef, endTimeRef), 300);
    return true; 
  } catch {
    return false;
  }
}