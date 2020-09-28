import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'

import { faAddressCard, faBars, faCamera, faComment, faEdit, faEnvelope, faPencilAlt, faPhone, faThumbsUp, faTimes, faTrashAlt, faUsers } 
  from '@fortawesome/free-solid-svg-icons'

import { AuthProvider } from './context/auth'
import ProtectedRoute from './util/ProtectedRoute'
import Header from './Components/Header/Header'
import NavBar from './Components/NavBar/NavBar'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Members from './Pages/Members/Members'
import Register from './Pages/Register/Register'
import SinglePost from './Pages/SinglePost/SinglePost'
import SingleMember from './Pages/SingleMember/SingleMember'
import UpdateProfile from './Pages/UpdateProfile/UpdateProfile'

import './App.css'
import 'semantic-ui-css/semantic.css';


library.add(
  faAddressCard, 
  faBars, 
  faCamera,
  faComment,  
  faEdit,
  faEnvelope, 
  faPencilAlt,
  faPhone,
  faThumbsUp, 
  faTimes,  
  faTrashAlt, 
  faUsers, 
)


function App() {


  return ( 
    <div>
    <AuthProvider>
      <Router>
        <div className='App'>
          <div className='App__sidebar'>
          <NavBar/>
          </div>
          <div className='navigation'>
            <Header />
          </div>
          <main className='App__main'>
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/posts" component={Home} />
            <ProtectedRoute exact path="/posts/:postId" component={SinglePost} />
            <ProtectedRoute exact path="/members" component={Members} />
            <ProtectedRoute exact path="/members/:memberId" component={SingleMember} />
            <ProtectedRoute exact path="/update" component={UpdateProfile} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </main>
        </div>
      </Router>
    </AuthProvider>
    </div>
  )
}

export default App