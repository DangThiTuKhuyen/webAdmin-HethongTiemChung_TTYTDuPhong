import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './Login/Login';
import Dashboard from './pages/Dashboard';
import Home from '../src/Home/Home'
import Profile from './pages/Profile';
import Customers from './pages/Customers';
import Registrations from './pages/Registrations';
import Statistical from './pages/Statistical';
import Vaccination from './pages/Vaccination';
import Histories from './pages/Histories';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
        <Sidebar>
          <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path="/history" element={<Histories />} />
            <Route path="/vaccination" element={<Vaccination />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/customers" element={<Customers />} />
            <Route path='/registrations' element={<Registrations />} />
            <Route path='/statistical' element={<Statistical />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
