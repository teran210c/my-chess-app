export function calculateScore (gameTime, movesAmount, amoutBestMoves) {
    const timeSocre = Math.max(0, 1 - (gameTime / (150 * 2)))
    console.log(timeSocre)
    const accuracy = amoutBestMoves / movesAmount
    console.log(accuracy)
}