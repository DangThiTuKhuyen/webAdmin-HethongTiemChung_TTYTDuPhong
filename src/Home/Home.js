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
import Registrations from '../pages/Registrations';
import Statistical from '../pages/Statistical';
import Vaccination from '../pages/Vaccination';
import Histories from '../pages/Histories'

const Home = () => {
  return (
   <>
   {/* <BrowserRouter> */}
      {/* <Sidebar>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/history" element={<Histories />} />
          <Route path="/vaccination" element={<Vaccination />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<Customers />} />
          <Route path='/registrations' element={<Registrations />}/>
          <Route path='/statistical' element={<Statistical />}/>
        </Routes>
      </Sidebar> */}
    {/* </BrowserRouter> */}
    </>
  );
};
export default Home;