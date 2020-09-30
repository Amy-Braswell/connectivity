import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {AuthContext} from '../../context/auth'
import Tooltip from '../Tooltip/Tooltip'
import './NavBar.css'



export default function NavBar() {
  const { user } = useContext(AuthContext)

  const navBar = !user ? (
    <div>{''}</div>
  ) : (
    <nav className='nav'>
      <div className='nav__flex-container nav__bar'>
        <div className='nav__item'>
          <Tooltip message='Posts'>
            <Link to={'/'} name="posts">
              <FontAwesomeIcon icon={['fa', 'address-card']} />
            </Link>
          </Tooltip>
        </div>
        <div className='nav__item'>
          <Tooltip message='Members'>
            <Link to={'/members'} name="members">
              <FontAwesomeIcon icon={['fa', 'users']} />
            </Link>
          </Tooltip>
        </div>
        <div className='nav__item'>
          <Tooltip message='Edit Profile'>
            <Link to={'/update'} name="update">
              <FontAwesomeIcon icon={['fa', 'pencil-alt']} />
            </Link>
          </Tooltip>
        </div>
      </div>
    </nav>
  )

  return navBar
}