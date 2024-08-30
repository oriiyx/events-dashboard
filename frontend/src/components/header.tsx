import {Link, useNavigate} from 'react-router-dom'
import {useEffect, useState} from "react";
import {getToken, logout} from "@/lib/auth.ts";
import {Button} from "@/components/ui/button.tsx";

export default function Header() {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const token = getToken();
        if (token) {
            setLoggedIn(true);
        }
    }, []);

    const logoutHandler = () => {
        logout();
        navigate('/login')
    }


    return (
        <header className="bg-black border-b-4 border-green-400 p-4 mb-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-green-400 text-2xl font-bold">Event Dashboard</Link>
                <div className="space-x-4">
                    {!loggedIn &&
                        <>
                            <Link to="/register"
                                  className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Register</Link>
                            <Link to="/login"
                                  className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Login</Link>
                        </>
                    }
                    {loggedIn &&
                        <>
                            <Button className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">
                                <Link to="/dashboard"
                                >Dashboard</Link>
                            </Button>
                            <Button onClick={logoutHandler}
                                    className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Logout</Button>
                        </>
                    }
                </div>
            </nav>
        </header>
    )
}