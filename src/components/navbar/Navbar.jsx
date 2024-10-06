import './navbar.css';

import { useState } from 'react';

const Navbar = () => {

    const [isMenu, setIsMenu] = useState(false);
    const [isToggle, setToggle] = useState(false);

    const toggleNavbar = async () => {
        setIsMenu(!isMenu);
        setToggle(!isToggle);
    };

    return (
        <>

            <header>
                <a href="index.html" className="logo">
                    <h1> Projeto <span> Ornitorrinco</span> </h1>
                </a>

                <div className={`toggle ${isToggle ? 'active' : ''}`} onClick={toggleNavbar}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <ul id="menu" className={`menu ${isMenu ? 'active' : ''}`}>
                    <li> <a href="#introduction"> Início </a> </li>
                    <li> <a href="#introductionAPK"> APP do projeto </a> </li>
                    <li> <a href="#footer"> Sobre o projeto </a> </li>
                </ul>
            </header>

        </>
    );
};

export default Navbar;