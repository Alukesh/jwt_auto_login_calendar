import { useState } from "react";
import {AiFillHome} from "react-icons/ai";
import {MdDomainVerification} from "react-icons/md";
import {IoCarSportOutline} from 'react-icons/io5'
import {RiPoliceCarFill} from 'react-icons/ri'
import {BiLogOut} from 'react-icons/bi'
import {GiCarKey, GiHamburgerMenu} from 'react-icons/gi'
import { Link, NavLink } from "react-router-dom";




const Navigation = ({toggle, setToggle}) => {
    


    return (
        <nav className={`navigation ${toggle && 'active'}`}>
            <ul className="nav__list">
                <li className="nav__list-item">
                    <a href="https://alukesh.github.io/AlisherKenzhebaev.htmlCV/" target='_blank'>
                        <span className="nav__link-icon icon"><AiFillHome className="icon"/></span>
                        <span className="nav__link-title title">Портал</span>
                    </a>
                    
                </li>
                 <li className={`nav__list-item `}>
                    <NavLink to={'/'}>
                        <span className="nav__link-icon icon"><MdDomainVerification className="icon"/></span>
                        <span className="nav__link-title title">Главная</span>
                    </NavLink>
                </li>
                <li  className={`nav__list-item `}>
                    <NavLink to={'/bookings'}>
                        <span className="nav__link-icon icon"><GiCarKey className="icon"/></span>
                        <span className="nav__link-title title">Все броннирования</span>
                    </NavLink>
                </li>
                <li className={`nav__list-item `}>
                    <NavLink to={'/cars'}>
                        <span className="nav__link-icon icon"><RiPoliceCarFill className="icon"/></span>
                        
                        <span className="nav__link-title title">Машины</span>
                    </NavLink>
                </li>

        
            </ul>
        <div onClick={() => setToggle(prev=> !prev)} className='burger'><GiHamburgerMenu className="burger"/></div>

        </nav>
    );
};

export default Navigation;