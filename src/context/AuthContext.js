// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useHistory } from "react-router";
import { Route } from 'react-router-dom/cjs/react-router-dom.min';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? JSON.parse(savedTokens) : null;
  });

  const [user, setUser] = useState(() => {
    const savedTokens = localStorage.getItem('tokens');
    return savedTokens ? jwtDecode(savedTokens) : null;
  });


        const [data, setData] = useState([]);
        const history = useHistory();

  // Login Function
  const login = async (email, password) => {
    try {
   
                    
      const response = await axios.post('http://localhost:5000/api/v1/auth/login', { email, password });
        console.log(response.data)
      const token = response.data.token;
      setAuthTokens(token);
      localStorage.setItem('tokens', JSON.stringify(token));

      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
      console.log(response.data.data.role)

      // Redirect based on role
      if (response.data.data.role === 'admin') {
        console.log(response.data.role)
        
        <Route path="/" exact>
        <Redirect to="/home" />
      </Route>
      } else {
        history('/user');
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  // Logout Function
  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('tokens');
    history.push('/login');
  };

  // Effect to update user if the token changes
  useEffect(() => {
    if (authTokens) {
      const decodedUser = jwtDecode(authTokens);
      setUser(decodedUser);
    }
  }, [authTokens]);

  return (
    <AuthContext.Provider value={{ user, authTokens, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
