import React, {useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => setIsClicked(!isClicked);
    return (
        <div>
            <header className="navbar">
                <nav className="nav-container">
                    <Link to="/" className="nav-logo">
                        MATCHA
                    </Link>
                    <ul className={isClicked ? "nav-menu-items active" : "nav-menu-items"}>
                        <li className="nav-menu-li" onClick={handleClick}>
                            <Link to="/register" className="nav-link"> Sign Up </Link>
                        </li>
                        <li className="nav-menu-li" onClick={handleClick}>
                            <Link to="/login" className="nav-link"> Sign In </Link>
                        </li>
                    </ul>
                    <div className="nav-menu-icon" onClick={handleClick}>
                        <i className={isClicked ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                </nav>
            </header>
        </div>
    )
}
/*
<div className="nav-menu-icon" onClick={handleClick}>
                        <i className={isClicked ? 'fas fa-times' : 'fas fa-bars'}/>
                    </div>
                    { isClicked ?
                        (<div className="nav-menu-items-mobile">
                            <ul className='nav-menu-list'>
                                <li className="nav-menu-li">
                                    <Link to="/register" className="nav-menu-item"> Sign Up </Link>
                                </li>
                                <li className="nav-menu-li">
                                    <Link to="/login" className="nav-menu-item"> Sign In </Link>
                                </li>
                            </ul>
                        </div>)
                    : null}
                    <ul className="nav-menu-items">
                        <li className="nav-menu-li">
                            <Link to="/register" className="nav-menu-item"> Sign Up </Link>
                        </li>
                        <li className="nav-menu-li">
                            <Link to="/login" className="nav-menu-item"> Sign In </Link>
                        </li>
                    </ul>
                    */
export default Navbar
