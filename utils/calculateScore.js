export function calculateScore (gameTime, movesAmount, amountBestMoves) {
    const T_ideal = 150
    const T_max = 300

     const timeScore = Math.max(
        0,
        Math.min(1, 1 - ((gameTime - T_ideal) / (T_max - T_ideal)))
    )

    const accuracyScore = amountBestMoves / movesAmount

    const finalScore = Math.floor((timeScore + accuracyScore) / 2* 100)

    return finalScore
}