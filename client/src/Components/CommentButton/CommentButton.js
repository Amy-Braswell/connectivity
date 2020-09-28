import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip/Tooltip'



export default function CommentButton({ post: {id, commentCount}}) {
    
    const moreThanZero = commentCount !== 0 ? true : false

    const commentButton = 

    ( moreThanZero ?
        (
        <button
        className='Button--comment'
        type='button'
        >
        <span> <FontAwesomeIcon icon={['fas', 'comment']} />{' '}</span>
        <span>{' '}{commentCount}</span>
        </button>
        )

        :

        (
        <button
            className='Button--comment'
            type='button'
        >
            <span><FontAwesomeIcon icon={['fas', 'comment']} />{' '}</span>
        </button>
        ) 
    )

    return (
        <div>
              <Tooltip message="Comment">
                <Link to={`/posts/${id}`}> 
                    {commentButton}
                </Link>
              </Tooltip> 
        </div>
    )

}