import React from 'react';
import './Home.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard';
import About from '../pages/About.jsx';
import Analytics from '../pages/Analytics.jsx';
import Profile from '../pages/Profile';
import Login from '../Login/Login';
import Customers from '../pages/Customers';

const Home = () => {
  return (
   <>
   <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<Customers />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
    </>
  );
};
export default Home;