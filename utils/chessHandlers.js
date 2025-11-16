import { getBestMove } from "../services/stockfishApi";
import { calculateScore } from "./calculateScore"

export async function makeBestMove(chessGame, setChessPosition, setGameStatus, setWinner, setTime, startTimeRef, endTimeRef) {

    const bestMove = await getBestMove(chessGame.fen());
    if (!bestMove) return;

    try {
        chessGame.move(bestMove);

        setChessPosition(chessGame.fen());

        if (chessGame.isGameOver()) {
            setWinner("You lose :(")
            endTimeRef.current = Date.now()
            setTime(prev => prev = Math.trunc((endTimeRef.current - startTimeRef.current) / 1000))
            setGameStatus(prev => !prev)
            return true
        }
    } catch (error) {
        console.error("Error applying engine move:", error);
    }
}

export async function onPieceDrop(
    { sourceSquare, targetSquare },
    chessGame,
    setChessPosition,
    setGameStatus,
    setWinner,
    setTime,
    startTimeRef,
    endTimeRef,
    setHistory,
    countBestMoves
) {
    const prevFen = chessGame.fen()
    if (!targetSquare) return false;      

    try {
        chessGame.move({
            from: sourceSquare,
            to: targetSquare,
            promotion: "q",
        });
        const userMove = ([sourceSquare, targetSquare].join(""))
        
        setChessPosition(chessGame.fen());

        
        console.log(userMove)
        const userBestMove = await getBestMove(prevFen);
      
        console.log(userBestMove)
        if (userMove === userBestMove) {
            console.log(true)
            countBestMoves.current = countBestMoves.current += 1
        } else {
            console.log(false)
        }


        if (startTimeRef.current === null) {
            startTimeRef.current = Date.now()
        }

        // console.log(chessGame.history({ verbose: true }))

        if (chessGame.isGameOver()) {
            setWinner("You win!")
            endTimeRef.current = Date.now()
            const gameTime = (endTimeRef.current - startTimeRef.current) / 1000
            setTime(prev => prev = gameTime)
            const movesAmount = chessGame.history(({ verbose: true }).length)
            setHistory(chessGame.history({ verbose: true }))
            calculateScore(gameTime, movesAmount, countBestMoves.current)
            setGameStatus(prev => !prev)

            return true
        }

        setTimeout(() => makeBestMove(
            chessGame, 
            setChessPosition, 
            setGameStatus, 
            setWinner, 
            setTime, 
            startTimeRef, 
            endTimeRef
        ), 300);
        return true;
    } catch {
        return false;
    }
}