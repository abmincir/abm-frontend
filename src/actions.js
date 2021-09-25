import store from './store';

export const dataBaseChange = (
  _id,
  name,
  address,
  username,
  password,
  proc
) => {
  store.dispatch({
    type: 'changeDataBase',
    payload: {
      _id: _id,
      name: name,
      address: address,
      username: username,
      password: password,
      proc: proc,
    },
  });
};

export const accountChange = (_id, username, password) => {
  store.dispatch({
    type: 'changeAccount',
    payload: {
      _id: _id,
      username: username,
      password: password,
    },
  });
};

export const clearState = () => {
  store.dispatch({
    type: 'clearState',
  });
};
