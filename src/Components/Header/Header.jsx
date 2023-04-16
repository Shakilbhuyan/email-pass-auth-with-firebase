import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <nav className='d-flex justify-content-center gap-4 bg-info p-3'>
            <Link className='text-decoration-none' to ="/">Home</Link>
            <Link className='text-decoration-none' to ="/login">Login</Link>
            <Link className='text-decoration-none' to ="/register">Register</Link>
        </nav>
    );
};

export default Header;