import store from './store';

export const dataBaseChange = (ID, name) => {
  store.dispatch({
    type: 'changeDataBase',
    payload: {
      ID: ID,
      name: name,
    },
  });
};

export const accountChange = (ID, name) => {
  store.dispatch({
    type: 'changeAccount',
    payload: {
      ID: ID,
      name: name,
    },
  });
};

export const clearState = () => {
  store.dispatch({
    type: 'clearState',
  });
};
