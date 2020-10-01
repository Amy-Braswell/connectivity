import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';


const initialState = {
  user: null
};

const AuthContext = createContext({
  user: null,
  photos: [],
  isAuth: false,
  login: (userData) => {},
  logout: () => {},
  updateUser: (userData) => {}
});


if (localStorage.getItem('jwtToken')) {
  const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem('jwtToken');
  }   
  else {
    initialState.user = decodedToken;
    }
  } 



function ContextReducer(state, { type, payload}) {
  switch (type) {
    case "CREATE_PHOTO":
      // console.log('CREATE_PHOTO_CASE has run... payload is: ', payload)
      // console.log('updated state is: ', state)
      return {
        ...state,
        newPicture: payload
      };
    case 'LOGIN':
      return {
        ...state,
        user: payload 
      }
      ;
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}



function AuthProvider(props) {
  const [state, dispatch] = useReducer(ContextReducer, initialState);

  function login(userData) {
    localStorage.setItem('jwtToken', userData.token || userData.tokenId)
    dispatch({
      type: 'LOGIN',
      payload: userData
    });
  }

  function logout() {
    localStorage.removeItem('jwtToken');
    dispatch({ type: 'LOGOUT' });
  }


  return (
    <AuthContext.Provider
    value={{ user: state.user, photos: state.photos, isAuth: state.isAuth, login, logout, dispatch }}
    {...props}
    />
  );
}

export { AuthContext, AuthProvider, ContextReducer }