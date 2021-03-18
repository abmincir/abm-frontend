import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled, { css } from 'styled-components';
import './App.css';
import ChangePass from './components/change-pass/ChangePass';
import CreateUser from './components/crateUser/createUser';
import Home from './components/home/Home';
import SideMenu from './components/SideMenu/SideMenu';
import SignIn from './components/sign-in/SignIn';

const App = () => {
  const [authenticated, setAuthenticated] = useState(-1);

  const [visible, setVisible] = useState(false);
  const [isAdmin, setAdmin] = useState(false);

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
    <BrowserRouter>
      {/* {authenticated === 1 ? (
          AdminPages
        ) : authenticated === 0 ? (
          UserPages
        ) : ( */}
      <SideMenuContainer visible={visible}>
        <SideMenu />
      </SideMenuContainer>

      <Header isAdmin={isAdmin}>
        <div onClick={() => setVisible(!visible)}>{menu}</div>
        <p>کشت و صنعت اکسون</p>
      </Header>

      <Switch>
        <Route path="/sign-In">
          <SignIn />
        </Route>
        <Route path="/">
          <Redirect to="/sign-in" />
        </Route>
      </Switch>
      {/* )} */}
    </BrowserRouter>
  );

  return pages;
};

export default App;

const SideMenuContainer = styled.div`
  top: 0px;
  right: -333px;
  width: 333px;
  height: 100%;
  position: fixed;
  z-index: 2;
  transition: all 0.8s ease;
  ${(props) =>
    props.visible
      ? css`
          transform: translate(-333px, 0);
        `
      : css`
          transform: translate(333px, 0);
        `}
`;

const menu = (
  <svg
    xmlns="http://www.w4.org/2000/svg"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill="none"
    stroke="#FFF"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-menu menu-animation menu-button"
  >
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

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
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-start;
  align-items: center;

  width: 100vw;
  height: 70px;
  min-height: 70px;
  padding-right: 48px;

  p {
    color: white;

    letter-spacing: 0px;
    text-align: center;
    white-space: nowrap;

    font-family: 'Dana-Bold', Helvetica, Arial, serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 700;

    margin-right: 16px;
  }
  ${(props) =>
    props.isAdmin
      ? css`
          background-color: rgba(112, 112, 112, 1) !important ;
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
