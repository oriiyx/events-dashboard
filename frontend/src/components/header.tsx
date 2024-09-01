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
        <header className="bg-black border-b-4 border-green-400 mb-4">
            <nav className="flex justify-end items-center pb-4 gap-4">
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
                        <Link to="/dashboard"
                              className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary h-10 text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors"
                        >Dashboard</Link>
                        <Button onClick={logoutHandler}
                                className="text-green-400 hover:text-green-300 px-3 py-2 rounded-none border-2 border-green-400 hover:bg-green-900 transition-colors">Logout</Button>
                    </>
                }
            </nav>
        </header>
    )
}