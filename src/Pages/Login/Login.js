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
    email: 'demo-user@email.com',
    password: 'demo-user'
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
      
      <div className='login-section'>
      
          <Form onSubmit={onSubmit} className={loading ? 'login-form loading-login' : 'login-form'}>
            {/* <Form onSubmit={onSubmit} className='login-form loading-login'> */}
            {Object.keys(errors).length > 0 && (
              <div className="Error Message">
                <ul className="Error__list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <ul className="noBullet">
              <li>
                <label htmlFor="Email"> 
                  <input
                    className='inputFields' 
                    id="email"
                    placeholder="Email..."
                    name="email"
                    type="text"
                    value={values.email}
                    error={errors.email ? 'true' : 'false'}
                    onChange={onChange}
                  />
                </label>
              </li>
              <li>
                <label htmlFor="Password">
                  <input
                    className='inputFields'
                    placeholder="Password..."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? 'true' : 'false'}
                    onChange={onChange}
                  />
                </label>
              </li>
              <li>
                <input 
                  type="submit" 
                  id="join-btn" 
                  name="join" 
                  alt="Join" 
                  value="Login"
                />
              </li>
            </ul>
          </Form>
      </div>
      <footer className='footer'><p>.</p></footer>
    </section>
  )
}