import React from 'react'
import Dropdown from './Dropdown'


const items = [
    {
        id: 1,
        value: 'Pulp Fiction'
    },
    {
        id: 2,
        value: 'The Prestige'
    },
    {
        id: 3,
        value: 'Blade Runner 2049'
    }
]


export default function TestPage() {
    return(
        <div className="container">
           <Dropdown title="" items={items} multiSelect/>
        </div>
    )
}






