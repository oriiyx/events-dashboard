import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Dashboard from '@/Dashboard.tsx';
import Login from './Login';
import Register from './Register';
import PrivateRoute from "@/PrivateRoute.tsx";
import NotFound from "@/404.tsx";
import PublicRoute from "@/PublicRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route element={<PublicRoute/>}>
                    <Route path="/" element={<Login/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                </Route>
                <Route element={<PrivateRoute/>}>
                    <Route path="/" element={<Dashboard/>}/>
                    <Route path="/dashboard" element={<Dashboard/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
