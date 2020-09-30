import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useMutation } from '@apollo/react-hooks'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GraphQLClient } from 'graphql-request'

import {AuthContext} from '../../context/auth'
import { useForm } from '../../util/hooks'
import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'
import { UPDATE_USER } from '../../graphql.js/mutations'
import Form from '../../util/Form'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import './UpdateProfile.css'



export default function UpdateProfile(props) {
  const [errors, setErrors] = useState({})
  const [picture, setPicture] = useState('')

  const { dispatch, user } = useContext(AuthContext)

  const currentData = user
  const newPicture = currentData.newPicture


  let { onChange, onSubmit, values } = useForm(updateUserCallback, {
    email: currentData.email,
    about: '',
    relation: '',
    city: '',
    state: '',
    phone: '',
    picture: newPicture || currentData.picture,
    banner: currentData.banner
  });

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(
      _,
      {
        data: { update: userData }
      }
    ) {
      props.history.push(`/members/${currentData.id}`)
      // console.log('values: ', values)
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  });

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', picture)
    data.append('upload_preset', 'geopins')
    data.append('cloud_name', 'amy-braswell')

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/amy-braswell/image/upload',
      data
    )
    return res.data.url
  }

  const handleImageSubmit = async e => {
    try {
      e.preventDefault()
      // upload image to Cloudinary and retrieve its URL
      // grab the successfully logged-in user's Google idToken
      const idToken = localStorage.getItem('jwtToken')
      // create a GraphQL Client object, pass it the token as an auth header
      const client = new GraphQLClient('http://localhost:4000/graphql', {
        headers: {
          authorization: idToken,
        }, 
      })
      const imageUrl = await handleImageUpload()
      // create GraphQL variables object
      const variables = {
        picture: imageUrl,
      }
      // send mutation to create new Photo, grab response
      let picture = await client.request(CREATE_PHOTO_MUTATION, variables)
      // add new Photo to 'photo' in state
      user.picture = await picture
      let newPicture = user.picture.createPhoto.picture
      dispatch({ type: 'CREATE_PHOTO', payload: newPicture })
      // console.log('newPicture = user.picture.createPhoto.picture: ', newPicture)
    } catch (err) {
      console.error('Error creating Photo', err)
    }
  }

  function updateUserCallback() {
    updateUser()
  }

  function goBack() {
    props.history.replace('/')
  }

  const infoTab = (
    <div className='single-member-card__info'>
            {Object.keys(errors).length > 0 && (
              <div className="Error Message error">
                <ul className="Error__list">
                  {Object.values(errors).map((value) => (
                    <li key={value}>{value}</li>
                  ))}
                </ul>
              </div>
            )}

            <Form onSubmit={handleImageSubmit} className={loading ? 'Loading register--loading' : ''}>
          
              <input
                className='input--update-picture select-file'
                name="picture"
                accept="image/*"
                id="image"
                type="file"
                onChange={e => setPicture(e.target.files[0])}
              />

              <div className="overlay-layer">
                Click here to select profile photo
                </div>

              <div className='Button--submit update__buttons button--upload'>
                <button 
                  className='update--button'
                  type='submit'>
                  Upload
                </button>
              </div>
            </Form>

            <Form onSubmit={onSubmit} noValidate className={loading ? 'Loading register--loading' : ''}>
          
              <p className='update-question'>
                    How do you know the patient? 
              </p>

              <label htmlFor="Relation"/>
              <span className='update-pencil'><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                  placeholder= {currentData.relation}
                name="relation"
                type="text"
                value={values.relation}
                error={errors.relation ? 'true' : 'false'}
                onChange={onChange}
              />

              <p className='update-question'>
                  What are your hobbies, interests, etc?
              </p>
              
              <label htmlFor="About" />
              <span className='update-pencil'><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                placeholder={currentData.about}
                name="about"
                type="text"
                value={values.about}
                error={errors.about ? 'true' : 'false'}
                onChange={onChange}
              />

              <p className='update-question'>
                  Where do you currently live?
              </p>
                  
              <div className="update-answer-half__flex-container">
                
                <div className="update-answer-half">
                  <label htmlFor="City"/>
                  <span className='update-pencil'><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
                  <input
                    className='update-answer'
                    placeholder={currentData.city}
                    name="city"
                    type="text"
                    value={values.city}
                    error={errors.city? 'true': 'false'}
                    onChange={onChange}
                  />

                </div>
                
                <div className="update-answer-half">
                  <label htmlFor="State" />
                  <span className='update-pencil'><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
                  <input
                    className='update-answer'
                    placeholder={currentData.state}
                    name="state"
                    type="text"
                    value={values.state}
                    error={errors.state? 'true' : 'false'}
                    onChange={onChange}
                  />
                </div>
              </div>

              <p className='update-question'>
                  Contact Info:
              </p>

              <label htmlFor="Phone" />
              <span className='update-pencil'><FontAwesomeIcon icon={['fa', 'pencil-alt']} /></span>
              <input
                className='update-answer'
                placeholder={currentData.phone}
                name="phone"
                type="text"
                value={values.phone}
                error={errors.phone? 'true' : 'false'}
                onChange={onChange}
              />

              <div className='Button--submit update__buttons'>
                <button 
                  className='update--button'
                  type='submit'>
                  Update
                </button>
              </div>

              <div className='Button--submit update__buttons'>
                <button 
                  className='update--button'
                  type='cancel'
                  onClick={goBack}
                >
                  Cancel
                </button>
                
              </div>
            </Form>

    </div>
  );

  const displayTabs = (
    <Tabs
      defaultIndex={0} 
    >
        <TabList>
            <Tab>Update Info</Tab>
        </TabList>
        <TabPanel>{infoTab}</TabPanel>
    </Tabs>
  )

return(
  <section className='update-member-main'>
    <h2 className='update-member__title'>Update Your Profile</h2>
      
      <div className='update-member-card__profile-pix'>
        <div className='update-member-card__banner'>
            <img 
                src={currentData.banner}
                alt='member cover'
            >
            </img>    
        </div>
        <div className='update-member-card__thumbnail--round'>
            <img 
                src={currentData.newPicture || currentData.picture}
                alt='member headshot'
            >
            </img>    
        </div>
      </div>

    <div className='update-member-card__flex-container'>

        <h2 className='update-member-card__name'>
          {currentData.name}
        </h2>

        {displayTabs}

    </div>
    
      </section>
    )
}
