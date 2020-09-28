import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FETCH_USER_QUERY } from '../../graphql.js/queries'


export default function Info(props){

    const userId = props.match.params.memberId;

    const {
        data: { getUser }
    } = useQuery(FETCH_USER_QUERY, {
        variables: {
        userId
        }
    })

    let userMarkup;
    if (!getUser) {
        userMarkup = <p>Loading user..</p>;
    } else {
        const {
            name,
            city,
            state,
            about,
            relation,
            email,
            phone,
        } = getUser;

    userMarkup = (
        <div className='single-member-card__info'>

            <h2 className='single-member-card__name'>
                {name}
            </h2>

            {relation && (<p className='single-member-card__relation question'>
                How do you know the patient? 
            </p>)}
            <p className='single-member-card__relation answer'>
                {relation}
            </p>

            {about && (
            <p className='single-member-card__about question'>
                What are your hobbies, interests, etc?
            </p>)}
            <p className='single-member-card__about answer'>
                {about}
            </p>
            
            {state && (
            <p className='single-member-card__location question'>
                Where do you currently live?
            </p>)}
            {state && (<p className='single-member-card__location answer'>
                {city}, {state}
            </p>)}

            {email && (<p className='single-member-card__location question'>
                Contact Info:
            </p>)}
            <p className='single-member-card__title answer'>
                {phone}
            </p>
            <p className='single-member-card__title answer'>
                {email}
            </p>

        </div>
    )
    }
    
    return userMarkup

}