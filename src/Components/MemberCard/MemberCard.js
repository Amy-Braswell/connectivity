import React from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../Tooltip/Tooltip'
import './MemberCard.css'



export default function MemberCard({
    user: { id, name, city, state, picture, relation }
}) 
    
{return (
    <section className='member-card__flex-container'>

      <div className='member-card__thumbnail'>
        <Link to={`/members/${id}`}>
        <Tooltip  left='-15px'
            message={relation}>
          <div className='member-card__thumbnail--round'>
            <img 
                src={picture}
                alt='member headshot'
            >
            </img>
          </div> 
          </Tooltip> 
        </Link>
      </div>
      
      <div className='member-card__info'>
      <Link to={`/members/${id}`}>
        <h3 className='member-card__title'>
            {name}
        </h3>
      </Link>
        { city ? 
          (<p className='member-card__location'>
              {city}, {state}
            </p>
          ) 
          : 
          ('')
        }
      </div>
      
    </section>
  )
}