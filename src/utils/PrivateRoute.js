// src/utils/PrivateRoute.js
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};
export default PrivateRoute
