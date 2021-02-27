import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import './App.css';
import ChangePass from './components/change-pass/ChangePass';
import Home from './components/home/Home';
import SideMenu from './components/SideMenu/SideMenu';
import SignIn from './components/sign-in/SignIn';
const App = () => {
  const pages = (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route path="/home">
          <Home />
        </Route>

        <Route path="/side-menu">
          <SideMenu />
        </Route>

        <Route path="/sign-In">
          <Wrapper>
            <Header />
            <Content>
              <SignIn />
            </Content>
          </Wrapper>
        </Route>

        <Route path="/change-pass">
          <Wrapper>
            <Header />
            <Content>
              <ChangePass />
            </Content>
          </Wrapper>
        </Route>
      </Switch>
    </BrowserRouter>
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
  background-color: var(--caribbean-green);
  height: 66px;
  width: 1366px;
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
