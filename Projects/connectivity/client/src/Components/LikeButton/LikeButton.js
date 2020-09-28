import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Tooltip from '../Tooltip/Tooltip'
import { LIKE_POST_MUTATION } from '../../graphql.js/mutations'



export default function LikeButton({ user, post: { id, likeCount, likes } }) {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    if (user && likes.find((like) => like.name === user.name)) {
      setLiked(false)
    } else setLiked(false)
  }, [user, likes]
  )

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
  }
  )
  const moreThanZero = likeCount !== 0 ? true : false

  const likeButton = 

  ( moreThanZero ?
    (liked ? (
      <button
        className='Button--like'
        type='button'
      >
        <span> <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}</span>
        <span>{' '}{likeCount}</span>
      </button>
    ) : (
    <button
      className='Button--like'
      type='button'
    >
      <span> <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}</span>
      <span>{' '}{likeCount}</span>
    </button>
    ))

    :

    (liked ? (
      <button
        className='Button--like'
        type='button'
      >
        <span> <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}</span>
      </button>
    ) : (
    <button
      className='Button--like'
      type='button'
    >
      <span> <FontAwesomeIcon icon={['fa', 'thumbs-up']} />{' '}</span>
    </button>
    ))
  )
 
  return (
    <div onClick={likePost}>
      <Tooltip  left='-15px'
        message={liked ? 'Unlike' : 'Like'}>
          {likeButton}
      </Tooltip>
    </div>
  )
}

