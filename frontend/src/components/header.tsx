import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header className="bg-black border-b-4 border-green-400 p-4 mb-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-green-400 text-2xl font-bold">Event Arcade</Link>
                <div className="space-x-4">
                    <Link to="/register" className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Register</Link>
                    <Link to="/login" className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Login</Link>
                    <Link to="/dashboard" className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Dashboard</Link>
                </div>
            </nav>
        </header>
    )
}