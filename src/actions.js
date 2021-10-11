import store from './store';

export const dataBaseChange = (
  _id,
  name,
  title,
  address,
  username,
  password,
  isShamsi,
  proc
) => {
  store.dispatch({
    type: 'changeDataBase',
    payload: {
      _id: _id,
      name: name,
      title: title,
      address: address,
      username: username,
      password: password,
      isShamsi: isShamsi,
      proc: proc,
    },
  });
};

export const accountChange = (_id, username, title, password) => {
  store.dispatch({
    type: 'changeAccount',
    payload: {
      _id: _id,
      username: username,
      title: title,
      password: password,
    },
  });
};

export const clearState = () => {
  store.dispatch({
    type: 'clearState',
  });
};
