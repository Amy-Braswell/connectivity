import React, { useContext, useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import  { ContextReducer } from '../context/auth';

const initialState = {
  user: null
};

function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useContext(AuthContext);

  const [state] = useReducer(ContextReducer, initialState);
  console.log(state)

  return (
    <Route
      {...rest}
      render={(props) =>
        !user ? <Redirect to="/login" /> : <Component {...props} />
      }
    />
  );
}

export default ProtectedRoute;