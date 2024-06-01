import './App.css';
import {Route, Routes } from 'react-router-dom';
import AppToolbar from './components/Toolbar';
import Login from './features/Users/Login';
import Register from './features/Users/Register';
import ProtectedRoute from "./components/ProjectedRoute/ProjectedRoute";
import ImagesStorageForm from "./features/ImageStorage/ImageStorageForm";
import {selectUser} from "./features/Users/usersSlice";
import {useAppSelector} from "./App/hooks";
import Images from "./features/ImageStorage/Image";

function App() {
    const user = useAppSelector(selectUser);

    return (
        <>
            <header>
                <AppToolbar />
            </header>
            <Routes>
                <Route path="/" element={<Images />} />
                <Route path="/photos/:id" element={<div>Thats profile</div>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/addPhoto" element={
                    <ProtectedRoute isAllowed={user && user.role !== ''}>
                        <ImagesStorageForm />
                    </ProtectedRoute>}
                />
                <Route path="*" element={<h2>not found!</h2>} />
            </Routes>
        </>
    );
}

export default App;
