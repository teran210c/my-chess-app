import icon from "../public/vercel.svg"

export default function Header() {

    return  (
        <nav>
            <img src={icon} alt="icon" />
            <span>ChessApp</span>
        </nav>
    )
}