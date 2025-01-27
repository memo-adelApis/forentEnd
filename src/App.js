// src/App.js
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch
} from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Login from  './Components/auth/Login'
import AdminPanel from './Components/admin/AdminPanel';
import UserPanel from './Components/user/UserPanel';
import PrivateRoute from './utils/PrivateRoute'

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <PrivateRoute path="/admin" component={AdminPanel} />
          <PrivateRoute path="/user" component={UserPanel} />
        </Switch>
      </Router>
    </AuthProvider>
  );
};

export default App;
