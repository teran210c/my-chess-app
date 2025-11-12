"use client";

import { useRef, useState } from "react";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";
import { Chess } from "chess.js"; // 👈 clave para evitar el error de import

export default function Board() {
  // crear una instancia persistente del juego
  const chessRef = useRef(new Chess());
  const chess = chessRef.current;

  // estados de posición y animación
  const [animationDuration, setAnimationDuration] = useState(300);
  const [chessPosition, setChessPosition] = useState(chess.fen());

  // función para hacer un movimiento aleatorio (CPU)
  function makeRandomMove() {
    const possibleMoves = chess.moves();

    if (chess.isGameOver() || possibleMoves.length === 0) return;

    const randomMove =
      possibleMoves[Math.floor(Math.random() * possibleMoves.length)];

    chess.move(randomMove);
    setChessPosition(chess.fen());
  }

  // manejar el evento de arrastrar y soltar
  const onPieceDrop = ({
    sourceSquare,
    targetSquare,
  }: PieceDropHandlerArgs) => {
    if (!targetSquare) return false;

    try {
      chess.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // siempre promocionar a reina
      });

      setChessPosition(chess.fen());

      // hacer el movimiento aleatorio después de un corto retraso
      setTimeout(makeRandomMove, 500);

      return true;
    } catch {
      return false;
    }
  };

  // opciones del tablero
  const chessboardOptions = {
    animationDurationInMs: animationDuration,
    position: chessPosition,
    onPieceDrop,
    id: "animation-duration-in-ms",
  };

  // renderizado
  return (
    <div className="flex flex-col items-center gap-4 mt-6">
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

      <Chessboard options={chessboardOptions} />

      <p className="text-sm text-gray-500">
        Play against random moves. Try moving pieces to see the animation effect.
      </p>
    </div>
  );
}
