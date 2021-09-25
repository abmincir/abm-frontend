const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'changeDataBase':
      return {
        ...state,
        dataBase: {
          _id: action.payload._id,
          name: action.payload.name,
          address: action.payload.address,
          username: action.payload.username,
          password: action.payload.password,
          proc: action.payload.proc,
        },
      };
    case 'changeAccount':
      return {
        ...state,
        account: {
          _id: action.payload._id,
          username: action.payload.username,
          password: action.payload.password,
        },
      };

    case 'clearState':
      return {};

    default:
      return state;
  }
};

export default reducer;
