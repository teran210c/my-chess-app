"use client";
import { useRouter } from "next/navigation";

export default function Path() {
    const router = useRouter()

    const levels = [
        {id: 1, unlocked: true},
        {id: 2, unlocked: false}
    ]

    return (
        <div>
            <p>Path component</p>
            {levels.map(level => (
               level.unlocked && <p key={level.id}
               onClick={() => router.push(`board/level-${level.id}`)}
               >
                {level.id}
                </p>
            ))}
        </div>
        
    )
}