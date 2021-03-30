import { createContext } from 'react';

const authContext = createContext({
  authenticated: 1,
  setAuthenticated: (auth) => {},
});

export default authContext;
