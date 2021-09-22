const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'changeDataBase':
      return {
        ...state,
        dataBase: {
          ID: action.payload.ID,
          name: action.payload.name,
        },
      };
    case 'changeAccount':
      return {
        ...state,
        account: {
          ID: action.payload.ID,
          name: action.payload.name,
        },
      };

    case 'clearState':
      return {};

    default:
      return state;
  }
};

export default reducer;
