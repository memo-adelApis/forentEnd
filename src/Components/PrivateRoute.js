// src/utils/PrivateRoute.js
import React, { useContext } from 'react';
import { Redirect, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { authTokens } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={(props) =>
        authTokens ? (
          <Component {...props} />
        ) : (
          navigate("/login") 
        )
      }
    />
  );
};

export default PrivateRoute;
