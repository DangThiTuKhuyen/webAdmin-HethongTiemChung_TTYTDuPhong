import React, { useState} from 'react';
import {
    FaBars,
    FaRegChartBar,
    FaVirus
}from "react-icons/fa";
import {
    FiUsers,
    FiList,
    FiLogOut
} from "react-icons/fi";
import {
    CgProfile
} from "react-icons/cg";
import {
    MdChecklist
} from "react-icons/md"
import {
    CiCircleList,
    CiEdit
} from "react-icons/ci"
import {
    TbVaccineBottle
} from "react-icons/tb"

import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const menuItem=[
        {
            path:"/statistical",
            name:"Statistical",
            icon:<FaRegChartBar/>
        },
        {
            path:"/disease",
            name:"Disease",
            icon:<FaVirus/>
        },
        {
            path:"/vaccine",
            name:"Vaccine",
            icon:<TbVaccineBottle/>
        },
        {
            path:"/createVaccine",
            name:"Create Disease & Vaccine",
            icon:<CiEdit/>
        },
        {
            path:"/customers",
            name:"Customer",
            icon:<FiUsers/>
        },
        {
            path:"/registrations",
            name:"Registrations",
            icon:<FiList/>
        },
        {
            path:"/vaccination",
            name:"Vaccination",
            icon:<CiCircleList/>
        },
        {
            path:"/history",
            name:"History list",
            icon:<MdChecklist/>
        },
        {
            path:"/profile",
            name:"Profile",
            icon:<CgProfile/>
        },
        {
            path:"/logout",
            name:"Log out",
            icon:<FiLogOut/>
        }
    ]
    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   {/* <img src = "./Image/login.png" ></img> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassname="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;