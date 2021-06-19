const initHome = {
  recipes: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'GET_RECIPES') {
    return {
      ...state,
      recipes: action.value,
    };
  }

  return state;
};
