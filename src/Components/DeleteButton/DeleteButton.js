import React from 'react'
import {confirmAlert} from 'react-confirm-alert'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation } from '@apollo/react-hooks'

import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION } from '../../graphql.js/mutations'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import Tooltip from '../Tooltip/Tooltip'
import './DeleteButton.css'



export default function DeleteButton({ postId, commentId, callback }) {

  const confirmDelete = () => {
    return(
      confirmAlert({
        message: 'Are you sure?' ,
        buttons: [
          {
            label: 'No',
            onClick: () => {}
          },
          {
            label: 'Yes',
            onClick: () => deleteConfirmCallback()
          }
        ],
      })
    )
  };

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION

  const [deletePostOrMutation] = useMutation(mutation, {
    update(proxy) {
      
      if (!commentId) {
        const data = proxy.readQuery({
          query: FETCH_POSTS_QUERY
        })
        data.getPosts = data.getPosts.filter((p) => p.id !== postId)
        proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      }
      if (callback) {
        callback()
      }
    },
    variables: {
      postId,
      commentId
    }
  })

  function deleteConfirmCallback() {
    deletePostOrMutation()
  }

  return (
    <div className='delete__button'>
      <Tooltip left= "-20px"  message={commentId ? 'Delete comment' : 'Delete post'}>
        <button
          className='Button--delete'
          type='button'
          onClick={confirmDelete}
        >
          <FontAwesomeIcon icon={['fa', 'trash-alt']} />
        </button>
      </Tooltip>
    </div>
  );
}




