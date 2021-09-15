import React from 'react';
import { Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css'


function Navbar() {
    const isAuthenticated = localStorage.getItem('email');

    const logout = () => {
        localStorage.removeItem('email');
    }
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            <Link className="navbar-brand">Todos</Link>
            <ul className="navbar-nav mr-auto ">
                <li className="nav-item">
                    <Link className="nav-link text-info" to="/">Home</Link>
                </li>

            </ul>
            <ul className=" navbar-nav mr-3">
                <li className="nav-item">
                    {isAuthenticated ?
                        <Link className="nav-link text-danger" to="/login" onClick={logout}>Logout</Link>
                        :
                        <Link className="nav-link text-danger" to="/login">Login</Link>
                    }
                </li>
            </ul>

        </nav>
    )
}

export default Navbar
