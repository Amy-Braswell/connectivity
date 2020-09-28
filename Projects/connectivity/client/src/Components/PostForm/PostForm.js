
import React from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_POST_MUTATION } from '../../graphql.js/mutations'
import { FETCH_POSTS_QUERY } from '../../graphql.js/queries'
import Form from '../../util/Form'
import { useForm } from '../../util/hooks'

import './PostForm.css'



export default function PostForm() {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: ''
  })


  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      data.getPosts = [result.data.createPost, ...data.getPosts]
      proxy.writeQuery({ query: FETCH_POSTS_QUERY, data })
      values.body = ''
    }
  }
  
  
  );

  function createPostCallback() {
    createPost()
  }

  return (
    <section className='add-post__form'>
      <Form 
        onSubmit={onSubmit} 
        className={loading ? 'Loading add-post--loading' : ''}
      >
        <h3 className='add-post__title'>Create a post:</h3>

        <div className='add-post__flex-container'>
          <div className='add-post__form-group'>
            <label htmlFor="post-content">        
              <textarea
                className='new-post__content'
                id='post-content-input'
                placeholder="What's on your mind?"
                name="body"
                onChange={onChange}
                value={values.body}
              />
            </label>
          </div>

          <div className='Button--submit add-post__button'>
            <button type='submit'>
              Submit
            </button>
          </div>
        </div>
      </Form>
    </section>
  );
}
