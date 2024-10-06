import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home.jsx';
import Profile from '../pages/Profile.jsx';
import Authentication from '../pages/Authentication.jsx';


export function AppRoutes() {

    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path="*" element={<Home />} />
            <Route path="/index" element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/authentication' element={<Authentication />} />
        </Routes>
    );

}