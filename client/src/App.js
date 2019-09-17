import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';

import { LoginContext } from './login/LoginContext';
import PrivateRoute from './PrivateRoute.js';

import RegistrationForm from './register/register.js';
import LoginForm from './login/login.js';
import UserList from './users/user-list.js';

function App() {
  const [ creds, setCreds ] = useState({ email: '', password: '' });
  const [ userD, setUserD ] = useState({  });

  return (
    <LoginContext.Provider value={{ creds, setCreds, userD, setUserD }}>
      <div className="App">
        <Switch>
          <Route path='/register' component={ RegistrationForm } />
          <Route path='login' component={ LoginForm } />
          <PrivateRoute exact path='/users' component={ UserList } />
        </Switch>
      </div>
    </LoginContext.Provider>
  );
}

export default App;
