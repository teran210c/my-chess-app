"use client";

import { useRef, useState } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import { Chess } from "chess.js"; 

export default function Board({ initialPosition = "startpos" }: { initialPosition?: string }) {
  // Create a persistent instance of the chess game using a ref
  const chessRef = useRef(new Chess(initialPosition === "startpos" ? undefined : initialPosition));
  const chess = chessRef.current;

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
    if (chess.isGameOver()) return; // do nothing if the game is over

    const bestMove = await getBestMoveFromAPI(chess.fen());

    if (!bestMove) return;

    try {
      chess.move(bestMove); // apply the move
      setChessPosition(chess.fen()); // update board position
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

      // Let the engine respond after a short delay
      setTimeout(makeBestMove, 500);

      return true; // move was successful
    } catch {
      return false; // move was invalid
    }
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
      <p className="text-sm text-gray-500">
        Play against random moves. Try moving pieces to see the animation effect.
      </p>
    </div>
  );
}
