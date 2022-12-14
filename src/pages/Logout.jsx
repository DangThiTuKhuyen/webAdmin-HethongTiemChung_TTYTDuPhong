import React, { useState, useEffect  } from 'react';
import './Profile.scss'
import { logout } from '../Service/Service';

const Logout = () => {
  useEffect(() => {
    logout()
    .then(res => {
        window.location.replace('/login')
        localStorage.clear()
    })
    .catch(
      err => {
        console.log(err)
    })
  }, []);
}
export default Logout;