import React, { useContext, useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import {AuthContext} from '../../context/auth'
import Form from '../../util/Form'
import { LOGIN_USER } from '../../graphql.js/mutations'
import { useForm } from '../../util/hooks'

import './Login.css'


export default function Login(props) {
  const context = useContext(AuthContext)

  // JWT - APP ROUTE
  const [errors, setErrors] = useState({})

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  })

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(
      _,
      {
        data: { login: userData }
      }
    ) {
      context.login(userData)
      props.history.push('/')
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function loginUserCallback() {
    loginUser()
  }

  return  (
    <section className='login-main'>
      <div className='login__title'>          
        <h2>Welcome Back!</h2>
      </div>
      <div className='login__statement'>
        <p>
          Charles seems to be doing good this week. He has been a good sport about participating in physical
          therapy twice a day. He is starting to feel a little more settled at Symphony and is slowly 
          starting to meet other residents.
        </p>

        <p> 
          He did mention that his sweet tooth is getting the best of him and he wished he had some
          puzzle books. If you are interested in doing something for him, he would love anything you
          might be able to send his way to brighten his day... he particularly likes Sudoku and candied
          orange slices.
        </p>

        <p>
          I will post a new update next Sunday so you will know how this week goes.
        </p>

        <p>
          Thank you for all that you do! Charles is really grateful and feels very loved!
        </p>

        <p>
          Best wishes,
          <br></br>
          Susie
        </p>
      </div>

      <div className='login__flex-container'>
        <div className='login__img-container'>
          <img 
              src='https://res.cloudinary.com/connectivity/image/upload/c_scale,w_1000/v1592862388/Charles_95th_BDay-15_copy_n5tdhl.jpg'
              alt='patient headshot'
          >
          </img>    
        </div>

        <div className='login__info-container'>
          {Object.keys(errors).length > 0 && (
            <div className="Error Message">
              <ul className="Error__list">
                {Object.values(errors).map((value) => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          )}
          <h3 className='login__form-title'>Login:</h3>
          <Form onSubmit={onSubmit} className={loading ? 'loading-login' : ''}>
            <label htmlFor="Email"> 
              <input
                className='login__form-group' 
                placeholder="Email..."
                name="email"
                type="text"
                value={values.email}
                error={errors.email ? 'true' : 'false'}
                onChange={onChange}
              />
            </label>
            <label htmlFor="Password">
              <input
                className='login__form-group'
                placeholder="Password.."
                name="password"
                type="password"
                value={values.password}
                error={errors.password ? 'true' : 'false'}
                onChange={onChange}
              />
            </label>
            <div className='Button--submit login__button'>
              <button type='submit'>
                Login 
              </button>
            </div>
          </Form>
        </div>
      </div>
    </section>
  )
}