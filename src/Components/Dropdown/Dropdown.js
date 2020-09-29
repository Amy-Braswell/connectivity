import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import onClickOutside from 'react-onclickoutside'
import './Dropdown.css'



function Dropdown({ title, items = [], multiSelect = false }) {
    const [open, setOpen] = useState(false)
    const toggle = () => setOpen(!open)
    Dropdown.handleClickOutside = () => setOpen(false)

    return (
        <div className="dd-wrapper">
            <div 
                tabIndex={0} 
                className="dd-header" 
                role="button"
                onKeyPress={() => toggle(!open)} 
                onClick={() => toggle(!open)}  
            >  
                <div className='dd-header__title'>
                    <p className='dd-header__title--bold'>{title}</p>
                </div>
                <div className='dd-header__action'>
                    <p>{open ? <FontAwesomeIcon className='bars' icon={['fas', 'times']} /> : <FontAwesomeIcon className='times' icon={['fas', 'bars']} /> }</p>
                </div>
            </div>
            {open && (
                <ul className='dd__list'>
                    {items.map(item => (
                        <li className='dd__list-item' key={item.id}>
                            <button className='dd__li__button' type='button' onKeyPress={() => toggle(!open)} onClick={() => toggle(!open)}>  
                                {item.value}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

const clickOutsideConfig = {
    handleClickOutside: () => Dropdown.handleClickOutside
}

export default onClickOutside(Dropdown, clickOutsideConfig)

