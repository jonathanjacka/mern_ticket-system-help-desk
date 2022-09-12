import React from 'react';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout, reset } from '../features/auth/authSlice';

import  {toast } from 'react-toastify';

function Header() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const  {user } = useSelector((state) => state.auth );

    const handleLogout = () => {
        dispatch(logout());
        dispatch(reset());
        toast.success('You\'ve successfully logged out!');
        navigate('/');
        
    }

  return (
    <header className='header'>
        <div className="logo">
            <Link to="/">Support Desk</Link>
        </div>
        <ul>
            {
                user ? (
                    <li>
                        <button className='btn' onClick={handleLogout}><FaSignOutAlt /> Log out</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to='/login'><FaSignInAlt /> Login</Link>
                        </li>
                        <li>
                            <Link to='/register'><FaUser /> Register</Link>
                        </li>
                    </>
                )
            }
        </ul>
    </header>
  )
}

export default Header
