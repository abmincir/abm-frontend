import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './components/home/Home';

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
      </Switch>
    </BrowserRouter>
  );

  return pages;
};

export default App;
