export async function getBestMove(fen) {
        try{
            const response = await fetch(
                `https://stockfish.online/api/s/v2.php?fen=${fen}&depth=1`
            )
            const data = await response.json()
            
            if (data.success && data.bestmove) {
                const APImove = data.bestmove.split(" ")[1]
                return APImove
            }

        } catch (error) {
            console.error("Error consultano el API de Stockfish: ", error)
            return null
        }
    }