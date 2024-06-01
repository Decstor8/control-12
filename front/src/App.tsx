import './App.css';
import {Route, Routes } from 'react-router-dom';
import AppToolbar from './components/Toolbar';
import Login from './features/Users/Login';
import Register from './features/Users/Register';

function App() {

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<h2>not found!</h2>} />
            </Routes>
        </>
    )
}

export default App;
