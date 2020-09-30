import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import {AuthContext} from '../../context/auth'
import './MenuBar.css'



export default function MenuBar() {
  const { user, logout } = useContext(AuthContext)

  const menuBar = user ? (
    <nav>
      <div className='menubar__flex-container'>
        <div className='menubar__flex-item'>
          <Link to={'/'}>
          { user && (user.name)}
          </Link>
        </div>
        <div className='menubar__flex-item'>
          <Link to={'/login'} onClick={logout}>
            Logout
          </Link>
        </div>
      </div>
    </nav>
  ) : (
    <nav>
      <div className='menubar__flex-container'>
        <div className='menubar__flex-item'>
          <Link to={'/register'}>
            Register
          </Link>
        </div>
      </div>
    </nav>
  );

  return menuBar;
}