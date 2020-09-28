import React, { useContext, useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { Link } from 'react-router-dom'
import moment from 'moment'

import {AuthContext} from '../../context/auth'
import CommentButton from '../../Components/CommentButton/CommentButton'
import DeleteButton from '../../Components/DeleteButton/DeleteButton'
import LikeButton from '../../Components/LikeButton/LikeButton'
import Form from '../../util/Form'
import { FETCH_POST_QUERY } from '../../graphql.js/queries'
import { SUBMIT_COMMENT_MUTATION } from '../../graphql.js/mutations'

import './SinglePost.css'



export default function SinglePost(props) {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext); 
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const {
    data: { getPost }
  } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId
    }
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT_MUTATION, {
    update() {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment
    }
  });

  function deletePostCallback() {
    props.history.replace('/');
  }

  function goBack() {
    props.history.replace('/')
  }

  let postMarkup;
  if (!getPost) {
    postMarkup = <p>Loading post..</p>;
  } else {
    const {
      id,
      body,
      createdAt,
      name,
      picture,
      comments,
      likes,
      likeCount,
      commentCount
    } = getPost;

    postMarkup = (
      <section className='single-post-main'>
        <h2 className='single-post__title'>Public Post</h2>
          <button 
            className = "Button--back"
            onClick = {goBack}
          >
            Back
          </button>
        
        <div className='single-post-card__flex-container'>
          
          <div className='single-post-card__thumbnail'>
              <div className='post-card__thumbnail--round'>
                <img 
                    src={picture}
                    alt='member headshot'
                >
                </img>
              </div>  
          </div>

          <div className='single-post-card__info'>
            <h3 className='single-post-card__title'>
              <Link to={`/postId/${id}`}>
                {name}
              </Link>
            </h3>
            <div className='single-post-card__dates'>
          <div className='single-post-card__dates-created_at'>
                <span className='Date'>
                  {moment(createdAt).fromNow()}
                </span>
              </div>
            </div> 
            <p className='single-post-card__body'>{body}</p>
            <div className='single-post-card__button-container__flex-container'>
              <div className='single-other-buttons__container'>
                <LikeButton 
                  user={name} 
                  post={{ id, likeCount, likes }} 
                />
                <CommentButton 
                  post={{ id, commentCount }} 
                /> 
              </div>

              <div className='single-post-card-delete-button__container'>
                {user && user.name === name && (
                  <DeleteButton postId={id} callback={deletePostCallback} />
                )}
              </div>
            </div>
          </div>
        </div>
 
        <div className='single-post-comments-section add-comment__form'>  
          <Form>  
            <h3 className='add-comment__form__title'>Share a Public Comment</h3>
            
            <div className='add-comment__flex-container'>
              <div className='add-comment__form-group'>
                <label htmlFor="comment-content"> 
                  <textarea
                    className='new-comment__content'
                    id='comment-content-input'
                    type="text"
                    placeholder="What's on your mind?"
                    name="comment"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    ref={commentInputRef}
                  />
                </label>
              </div>

              <div className='Button--submit add-comment__button'>
                <button
                  type="submit"
                  disabled={comment.trim() === ''}
                  onClick={submitComment}
                >
                  Submit
                </button>
              </div>
            </div>
          </Form>    

          <div className='comments'>
            <ul className='comments__comment-list'>
              {comments.map((comment) => (
                <li key={comment.id} className='comment-in-list__flex-container'>
                  <div className='comment__thumbnail--round'>
                    <Link to={`/members/${id}`}>
                        <div className='comment__thumbnail'>
                          <img 
                              src={comment.picture}
                              alt='member headshot'
                          >
                          </img>
                        </div>  
                    </Link>
                  </div>

                  <div className="comment__content__flex-container">
                    
                    <div className="comment__info">
                      <h3 className='comment__title'>{comment.name}</h3>
                      <div className='comment__dates'>
                        <div className='comment__dates-created_at'>
                          <span className='Date'>
                            {moment(comment.createdAt).fromNow()}
                          </span> 
                        </div>
                      </div> 
                      <p className='comment__body'>{comment.body}</p>
                    </div>

                    <div className='comment__button-container__flex-container'>
                      <div className='comment-card-other-buttons__container'>
                        {/* TODO -- ADD LIKES AND LIKECOUNT TO COMMENTS / CHANGE post={{ id, likeCount, likes }}  */}
                        <LikeButton 
                          className="comment__like-button"
                          user={name} 
                          post={{ id, likeCount, likes }} 
                        />
                      </div>

                      <div className='comment-card-delete-button__container'>
                        {user && user.name === comment.name && (
                          <DeleteButton postId={id} commentId={comment.id} />
                        )}
                      </div>
                    </div>

                  </div>
                </li>
              ))}
              </ul>
          </div>
        </div>  
      </section>
    )
  }
  return postMarkup;
}

