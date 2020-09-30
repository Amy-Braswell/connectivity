import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import {AuthContext} from '../../context/auth'
import Dropdown from '../Dropdown/Dropdown'
import MenuBar from '../MenuBar/MenuBar'

import './Header.css'



export default function Header() {
    const { user, logout } = useContext(AuthContext)

    const loggedInItems = [
        {
            id: 1,
            value: <Link to={'/about'}><span className='dd__li--width'>About</span></Link>
        },
        {
            id: 2,
            value: <Link to={'/login'} onClick={logout}><span className='dd__li--width'>Logout</span></Link>
        }
      ]
    
      const loggedOutItems = [
        {
            id: 1,
            value: <Link to={'/register'}><span className='dd__li--width'>Register</span></Link>
        }
      ]

    return(
        <header>
            <div className='Desktop__header'>
                <div className='app__header__logo__container'>
                    <h1>
                        <Link to='/'>Connectivity</Link>{' '}
                    </h1>
                </div>

                <div className='menubar__container'>
                    <MenuBar />
                </div>  
            </div>

            <div className='Mobile__header'>
                <div className='app__header__logo__container'>
                    <h1>
                        <Link to='/'>Connectivity</Link>{' '}
                    </h1>
                </div>
                <div className="dropdown__container">
                    {user ?
                        <Dropdown items={loggedInItems}/> 
                        :
                        <Dropdown items={loggedOutItems}/> 
                    }
                </div>
            </div>

        </header>
    )
}