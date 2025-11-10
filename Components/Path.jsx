export default function Path() {
    const levels = [
        {id: 1, unlocked: true},
        {id: 2, unlocked: false}
    ]

    return (
        <div>
            <p>Path component</p>
            {levels.map(level => (
                <p>{level.id}</p>
            ))}
        </div>
        
    )
}