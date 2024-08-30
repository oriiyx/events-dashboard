import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '@/Dashboard.tsx';
import Login from './Login';
import Register from './Register';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;
