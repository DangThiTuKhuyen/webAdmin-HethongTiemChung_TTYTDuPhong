import React from 'react';
import './Home.css';
import Statistical from '../pages/Statistical';

const Home = () => {
  return (
   <>
   <Statistical></Statistical>
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