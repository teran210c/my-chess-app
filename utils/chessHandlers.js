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
    setScore,
    startTimeRef,
    endTimeRef,
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

        const userBestMove = await getBestMove(prevFen);
      
        if (userMove === userBestMove) {
           
            countBestMoves.current = countBestMoves.current += 1
        } 

        if (startTimeRef.current === null) {
            startTimeRef.current = Date.now()
        }

        

        if (chessGame.isGameOver()) {
            setWinner("You win!")

            endTimeRef.current = Date.now()
            const gameTime = (endTimeRef.current - startTimeRef.current) / 1000

            const movesAmount = chessGame.history(({ verbose: true })).length

            const myScore = calculateScore(gameTime, movesAmount, countBestMoves.current)

            setScore(prevScore => prevScore = myScore)

            setGameStatus(prev => !prev)

            return true
        }

        setTimeout(() => makeBestMove(
            chessGame, 
            setChessPosition, 
            setGameStatus, 
            setWinner, 
            setScore, 
            startTimeRef, 
            endTimeRef
        ), 300);
        return true;
    } catch {
        return false;
    }
}