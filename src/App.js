import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import './App.css';
import authContext from './components/authContext';
import ChangePass from './components/change-pass/ChangePass';
import CreateUser from './components/crateUser/createUser';
import Home from './components/home/Home';
import SignIn from './components/sign-in/SignIn';

const App = () => {
  const [authenticated, setAuthenticated] = useState(-1);

  const AdminPages = (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/sign-In">
        <SignIn />
      </Route>

      <Route path="/create-user">
        <Wrapper>
          <AdminHeader />
          <Content>
            <CreateUser />
          </Content>
        </Wrapper>
      </Route>

      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );

  const UserPages = (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>

      <Route path="/home">
        <Home />
      </Route>

      <Route path="/sign-In">
        <SignIn />
      </Route>

      <Route path="/change-password">
        <Wrapper>
          <Header />
          <Content>
            <ChangePass />
          </Content>
        </Wrapper>
      </Route>

      <Route path="/">
        <Redirect to="/home" />
      </Route>
    </Switch>
  );

  const pages = (
    <authContext.Provider value={{ authenticated, setAuthenticated }}>
      <BrowserRouter>
        {/* <p style={{ position: 'fixed', zIndex: '100', top: '0', left: '0' }}>
          {authenticated}
        </p> */}
        {authenticated === 1 ? (
          AdminPages
        ) : authenticated === 0 ? (
          UserPages
        ) : (
          <Switch>
            <Route path="/sign-In">
              <SignIn />
            </Route>
            <Route path="/">
              <Redirect to="/sign-in" />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    </authContext.Provider>
  );

  return pages;
};

export default App;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  background-color: white;

  overflow: hidden;

  height: 100%;
  width: 100%;
`;
const Header = styled.div`
  height: 66px;
  width: 100%;
  ${(props) =>
    props.isAdmin
      ? css`
          background-color: rgba(112, 112, 112, 1) !important;
        `
      : css`
          background-color: var(--caribbean-green);
        `}
`;
const AdminHeader = styled.div`
  background-color: rgba(112, 112, 112, 1);
  height: 66px;
  width: 100%;
`;
const Content = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;
  align-content: center;
  justify-items: center;
  overflow: hidden;
`;
