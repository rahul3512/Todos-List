import React from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'


function Navbar() {
    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand">Todos</Link>
            <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                    <Link className="nav-link text-info" to="/">Home</Link>
                </li>
                
            </ul>
            <ul className = " navbar-nav mr-3">
                <li className="nav-item">
                    <Link className="nav-link text-danger" to="/login">LogIn/SignUp</Link>
                </li>
            </ul>
        
        </nav>
    )
}

export default Navbar
