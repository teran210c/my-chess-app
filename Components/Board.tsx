"use client";

import { useRef, useState } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import { Chess } from "chess.js"; 

export default function Board({ initialPosition = "startpos" }: { initialPosition?: string }) {
  // Create a persistent instance of the chess game using a ref
  const chessRef = useRef(new Chess(initialPosition === "startpos" ? undefined : initialPosition));
  const chess = chessRef.current;
  
  const [winner, setWinner] = useState<string | null>(null);


  // State to control animation duration and current board position
  const [animationDuration, setAnimationDuration] = useState(300);
  const [chessPosition, setChessPosition] = useState(chess.fen());

  // Function to fetch the best move from the Stockfish API
  const getBestMoveFromAPI = async (fen: string): Promise<string | null> => {
    try {
      const response = await fetch("https://chess-api.com/v1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fen,               // current board position in FEN format
          depth: 12,         // search depth
          variants: 1,       // number of best moves to return
          maxThinkingTime: 50 // max time in ms for engine to think
        }),
      });

      const data = await response.json();
      return data.move || null; // return the best move or null if not found
    } catch (error) {
      console.error("Error fetching move from Stockfish API:", error);
      return null;
    }
  };

  // Function to apply the best move from the engine to the board
  const makeBestMove = async () => {
    // do nothing if the game is over
    if (chess.isGameOver()){
      return
    } 

    const bestMove = await getBestMoveFromAPI(chess.fen());

    if (!bestMove) return;

    try {
      chess.move(bestMove); // apply the move
      setChessPosition(chess.fen()); // update board position
      checkWinner();
    } catch (error) {
      console.error("Error applying engine move:", error);
    }
    
  };

  // Handle piece drop event from the user
  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    
    if (!targetSquare) return false;

    try {
      // Try to make the user's move
      chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to queen
      });

      setChessPosition(chess.fen()); // update board position
      checkWinner();
      // Let the engine respond after a short delay
      if (!chess.isGameOver()) {
        setTimeout(makeBestMove, 500);
      }

      return true; // move was successful
    } catch {
      return false; // move was invalid
    }
  };

  // Check winner function

  const checkWinner = () => {
  if (!chess.isGameOver()) return;

  if (chess.isCheckmate()) {
    const loser = chess.turn(); // “w” o “b”
    const winnerColor = loser === "w" ? "Black" : "White";
    setWinner(`${winnerColor} wins by checkmate`);
    return;
  }

  setWinner("Draw");
};

  // Chessboard configuration options
  const chessboardOptions = {
    animationDurationInMs: animationDuration,
    position: chessPosition,
    onPieceDrop,
    id: "animation-duration-in-ms",
  };

  // Render the board and controls
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      {/* Slider to control animation speed */}
      <label className="flex items-center gap-4">
        Animation duration (ms):
        <input
          type="range"
          min="0"
          max="1000"
          step="50"
          value={animationDuration}
          onChange={(e) => setAnimationDuration(Number(e.target.value))}
        />
        {animationDuration}ms
      </label>

      {/* Chessboard component */}
      <div style={{ width: 500, height: 500 }}>
        <Chessboard options={chessboardOptions} />
      </div>


      

      {/* Instructional text */}
      {winner && (
          <p className="text-lg font-bold text-red-600">
            {winner}
          </p>
        )}
    </div>
  );
}
