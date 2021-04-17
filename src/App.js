import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import AllUsers from './components/all-users/AllUsers';
import ChangePass from './components/change-pass/ChangePass';
import CreateUser from './components/crateUser/createUser';
import Home from './components/home/Home';
import SignIn from './components/sign-in/SignIn';

const App = () => {
  const checkAuth = () => {
    return localStorage.getItem('isAdmin') === 'true'
      ? 1
      : !!localStorage.getItem('username')
      ? 0
      : -1;
  };

  const AuthRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() === 1 ? (
          <Component {...props} />
        ) : checkAuth() === 0 ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/sign-in' }} />
        )
      }
    />
  );

  const UserRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() === 0 ? (
          <Component {...props} />
        ) : checkAuth() === 1 ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : (
          <Redirect to={{ pathname: '/sign-in' }} />
        )
      }
    />
  );

  const AdminRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        checkAuth() === 1 ? (
          <Component {...props} />
        ) : checkAuth() === 0 ? (
          <Redirect to={{ pathname: '/home' }} />
        ) : (
          <Redirect to={{ pathname: '/sign-in' }} />
        )
      }
    />
  );

  return (
    <BrowserRouter>
      <Content>
        <Switch>
          <Route exact path="/sign-in" component={SignIn} />
          <AuthRoute exact path="/home" component={Home} />

          <UserRoute exact path="/change-password" component={ChangePass} />

          <AdminRoute path="/create-user" component={CreateUser} />
          <AdminRoute path="/all-users" component={AllUsers} />
          <Route path="/">
            <Redirect to={{ pathname: '/home' }} />
          </Route>
        </Switch>
      </Content>
    </BrowserRouter>
  );
};

const Content = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 70px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  overflow: hidden;
`;

export default App;
