
import React from 'react'
import {gql} from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'
import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'
import { FETCH_PHOTOS_QUERY, FETCH_FOLDERS_QUERY } from '../../graphql.js/queries'
import Form from '../../util/Form'
import { useForm } from '../../util/hooks'




export default function PhotoForm() {

  const {data} = useQuery(FETCH_FOLDERS_QUERY)

  console.log(data)

  const { values, onChange, onSubmit } = useForm({
    image: ''
  })

  displayPhotos() {
    if(data.loading){
      return(<option disabled>Loading Folder...</option>)
    } else {
      return data.folders.map(folder => {
        return(<option key={folder.id} value={folder.image}></option>)
      })
    }
  }

  submitForm(e) {
    e.preventDefault()
    console.log(state)
  } 


    return (
      <section className='add-photo__form'>
        {/* <Form id='add-photo' onSubmit={submitForm.bind(this)}> */}
        <Form id='add-photo' >
          <h3 className='add-photo__title'>Create a photo:</h3>

          <div className='add-photo__flex-container'>
            <div className='add-photo__form-group'>
              <label htmlFor="photo-content">        
                <input
                  className='new-photo__content'
                  id='photo-image-input'
                  placeholder="What's on your mind?"
                  name="image"
                  // onChange={(e) => setState({image: e.target.value})}
                />
              </label>
            </div>

            <div className='add-photo__form-group'>
              <label htmlFor="photo-folder">        
                <select
                  className='new-photo__folder'
                  id='photo-folder-input'
                  name="folder"
                  // onChange={(e) => setState({folder: e.target.value})}
                >
                  <option>Select Folder</option>
                </select>
              </label>
            </div>

            <div className='Button--submit add-photo__button'>
              <button type='submit'>
                Submit
              </button>
            </div>
          </div>
        </Form>
      </section>
    );
}











START OF GEOPIN APPROACH

import React, { useState, useContext } from 'react'
import axios from 'axios'

import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'
// import { GraphQLClient } from 'graphql-request'
import { useClient } from '../../graphql.js/client'
import { withStyles } from '@material-ui/core/styles'
import {AuthContext} from '../../context/auth'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
//import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
// import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'
//import ClearIcon from '@material-ui/icons/Clear'
// import SaveIcon from '@material-ui/icons/SaveTwoTone'

const CreatePhoto = ({ classes }) => {
  const client = useClient()
  const {
    dispatch,
  } = useContext(AuthContext)

  // const [caption, setCaption] = useState('')
  // const [subcaption, setSubcaption] = useState('')
  const [image, setImage] = useState('')
  // const [thumbnail, setThumbnail] = useState('')
  // const [folder, setFolder] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'geopins')
    data.append('cloud_name', 'amy-braswell')

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/amy-braswell/image/upload',
      data
    )
    return res.data.url
  }

  const handleSubmit = async e => {
    try {
      e.preventDefault()
      // update isSubmitting in state (used to disable Submit button)
      setIsSubmitting(true)
      // upload image to Cloudinary and retrieve its URL
      const imageUrl = await handleImageUpload()
      // create GraphQL variables object
      const variables = {
        // caption: caption.trim(),
        // subcaption: subcaption.trim(),
        image: imageUrl,
        // thumbnail: imageUrl,
        // folder: folder.trim()
      }
      // grab the successfully logged-in user's Google idToken
      // const idToken = localStorage.getItem('jwtToken')
      // // create a GraphQL Client object, pass it the token as an auth header
      // const client = new GraphQLClient('http://localhost:5000/graphql', {
      //   headers: {
      //     authorization: idToken,
      //   }, 
      // })

      // send mutation to create new Pin, grab response
      const { createPhoto } = await client.request(CREATE_PHOTO_MUTATION, variables)
      // add new Pin to 'pins' in state, AND set as 'newPin' in state
      dispatch({ type: 'CREATE_PHOTO', payload: createPhoto })
      console.log('Photo created', { createPhoto })
    } catch (err) {
      // re-enable Submit button
      setIsSubmitting(false)
      console.error('Error creating Photo', err)
    }
  }

  return (
    <form className={classes.form}>
      {/* FORM HEADER */}
      <Typography
        className={classes.alignCenter}
        component="h2"
        variant="h4"
        color="secondary"
      >
        {/* <LandscapeIcon className={classes.iconLarge} /> */}
        Upload Photo
      </Typography>

      <div className={classes.inputContainer}>
        {/* PHOTO CAPTION INPUT */}
        {/* <TextField
          autoFocus
          name="caption"
          label="Caption"
          placeholder="Insert Photo Caption"
          fullWidth
          onChange={e => setCaption(e.target.value)}
        /> */}
        {/* PHOTO SUBCAPTION INPUT */}
        {/* <TextField
          autoFocus
          name="subcaption"
          label="Subcaption"
          placeholder="Insert Photo Subcaption"
          fullWidth
          onChange={e => setSubcaption(e.target.value)}
        /> */}
        {/* PHOTO IMAGE INPUT -- HIDDEN */}
        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        {/* PHOTO IMAGE INPUT -- ICON BUTTON */}
        <label htmlFor="image">
          <Button
            style={{ color: image && 'green' }}
            component="span"
            size="small"
            className={classes.button}
          >
            add a photo
            {/* //<AddAPhotoIcon /> */}
          </Button>
        </label>

        {/* PHOTO THUMBNAIL INPUT -- HIDDEN */}
        {/* <input
          accept="image/*"
          id="thumbnail"
          type="file"
          className={classes.input}
          onChange={e => setThumbnail(e.target.files[0])}
        /> */}
        {/* PHOTO IMAGE THUMBNAIL -- ICON BUTTON */}
        {/* <label htmlFor="thumbnail">
          <Button
            style={{ color: image && 'green' }}
            component="span"
            size="small"
            className={classes.button}
          >
            add a thumbnail */}
            {/* <AddAPhotoIcon /> */}
          {/* </Button>
        </label> */}







        {/* PHOTO FOLDER INPUT */}
        {/* <div className={classes.contentField}>
          <TextField
            name="folder"
            label="Folder"
            multiline
            rows="6"
            margin="normal"
            fullWidth
            variant="outlined"
            onChange={e => setFolder(e.target.value)}
          />
        </div> */}
      </div>


      {/* BUTTONS */}
      <div className={classes.buttonContainer}>
        {/* SUBMIT */}
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          // disabled={!caption.trim() || !image || !folder.trim() || isSubmitting}
          onClick={handleSubmit}
        >
          Submit
          {/* <SaveIcon className={classes.rightIcon} /> */}
        </Button>
      </div>
    </form>
  )
}

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit,
    width: '80%',
  },
  contentField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // margin: '0 auto',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    // marginRight: theme.spacing.unit,
    // marginLeft: 0,
  },
})

export default withStyles(styles)(CreatePhoto)

END OF GEOPINS APPROACH



























import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'

import axios from 'axios'

import { CREATE_PHOTO_MUTATION } from '../../graphql.js/mutations'
import { FETCH_PHOTOS_QUERY } from '../../graphql.js/queries'
import Form from '../../util/Form'
// import { useForm } from '../../util/hooks'

import { withStyles } from '@material-ui/core/styles'


// import TextField from '@material-ui/core/TextField'
// import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
// import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone'
// import LandscapeIcon from '@material-ui/icons/LandscapeOutlined'

function CreatePhoto({classes}) {
//   const { values, onChange, onSubmit } = useForm(createPhotoCallback, {
//     caption: '',
//     subcaption: '',
//     image: '',
//     folder: ''
//   })



  // const [caption, setCaption] = useState('')
  // const [subcaption, setSubcaption] = useState('')
  // const [image, setImage] = useState('')
// //   const [thumbnail, setThumbnail] = useState('')
//   const [folder, setFolder] = useState('')
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const handleDeleteDraft = () => {
//     dispatch({ type: 'DELETE_DRAFT' })
//   }



  const [image, setImage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageUpload = async () => {
    const data = new FormData()
    data.append('file', image)
    data.append('upload_preset', 'geopins')
    data.append('cloud_name', 'amy-braswell')

    const res = await axios.post(
      'https://api.cloudinary.com/v1_1/amy-braswell/image/upload',
      data
    )
    console.log(res)
    return res.data.url
  }


  const handleSubmit = async e => {
    try {
      e.preventDefault()
      // update isSubmitting in state (used to disable Submit button)
      setIsSubmitting(true)

      // upload image to Cloudinary and retrieve its URL
      const imageUrl = await handleImageUpload()
      // create GraphQL variables object
      const variables = {
        // caption: caption.trim(),
        // subcaption: subcaption.trim(),
        image: imageUrl,
        // thumbnail: thumbnailImageUrl,
        // folder: folder.trim()
      }

      

      console.log(variables)

      createPhoto()
      console.log(variables)
    } catch (err) {
      // re-enable Submit button
      setIsSubmitting(false)
      console.error('Error creating Photo', err)
    }
  }











  const [createPhoto, { loading }] = useMutation(CREATE_PHOTO_MUTATION, {
    // variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_PHOTOS_QUERY
      });
      data.getPhotos = [result.data.createPhoto, ...data.getPhotos]
      proxy.writeQuery({ query: FETCH_PHOTOS_QUERY, data })
    }
  });

 

  // const handleSubmit = async e => {
  //   try {
  //     e.preventDefault()
  //     // update isSubmitting in state (used to disable Submit button)
  //     setIsSubmitting(true)

  //     // upload image to Cloudinary and retrieve its URL
  //     const imageUrl = await handleImageUpload()
  //     // create GraphQL variables object
  //     const variables = {
  //       caption: caption.trim(),
  //       subcaption: subcaption.trim(),
  //       image: imageUrl,
  //       // thumbnail: thumbnailImageUrl,
  //       folder: folder.trim()
  //     }
  //     console.log(variables)
  //     // send mutation to create new Pin, grab response
  //     const { createPhoto } = await client.request(CREATE_PHOTO_MUTATION, variables)
  //     // add new Pin to 'pins' in state, AND set as 'newPin' in state
  //     dispatch({ type: 'CREATE_PHOTO', payload: createPhoto })
  //     // clear draft pin data from state/context
  //   //   handleDeleteDraft()
  //   //   console.log('Photo created', { createPhoto })
  //   } catch (err) {
  //     // re-enable Submit button
  //     setIsSubmitting(false)
  //     console.error('Error creating Photo', err)
  //   }
  // }

  return (
    <section className='add-photo__form'>
      <Form 
        onSubmit={handleSubmit()} 
        className={loading ? 'Loading add-post--loading' : ''}
      >

      <h3 className='add-photo__title'>Upload a photo:</h3>

      <div className='add-photo__flex-container'>
          <div className='add-photo__form-group'>
            <label htmlFor="photo-caption">        
              <textarea
                className='new-photo__caption'
                id='photo-caption-input'
                type='text'
                placeholder="Photo Title"
                name="caption"
                // onChange={onChange}
                // value={values.caption}
              />
            </label>
          </div>

          <div className='add-photo__form-group'>
            <label htmlFor="photo-subcaption">        
              <textarea
                className='new-photo__subcaption'
                id='photo-subcaption-input'
                type='text'
                placeholder="Photo Description"
                name="subcaption"
                // onChange={onChange}
                // value={values.subcaption}
              />
            </label>
          </div>

        <input
          accept="image/*"
          id="image"
          type="file"
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />

        {/* PIN PHOTO INPUT -- ICON BUTTON */}
        <label htmlFor="image">
          <Button
            style={{ color: image && 'green' }}
            component="span"
            size="small"
            className={classes.button}
          >
              add a photo
            {/* <AddAPhotoIcon /> */}
          </Button>
          </label>
      </div>

          <div className='Button--submit add-post__button'>
                <button type='submit'>
                  Submit
                </button>
          </div>



      </Form>
    </section>
  )
}

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit,
    width: '80%',
  },
  contentField: {
    // marginLeft: theme.spacing.unit,
    // marginRight: theme.spacing.unit,
    // margin: '0 auto',
    width: '100%',
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
  },
  input: {
    display: 'none',
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center',
  },
  iconLarge: {
    fontSize: 40,
    marginRight: theme.spacing.unit,
  },
  leftIcon: {
    fontSize: 20,
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    fontSize: 20,
    marginLeft: theme.spacing.unit,
  },
  buttonContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
    // marginRight: theme.spacing.unit,
    // marginLeft: 0,
  },
})

export default withStyles(styles)(CreatePhoto)



