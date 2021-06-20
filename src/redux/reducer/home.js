const initHome = {
  recipes: [],
  favorites: [],
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'GET_RECIPES') {
    return {
      ...state,
      recipes: action.value,
    };
  }
  if (action.type === 'GET_FAVORITES') {
    return {
      ...state,
      favorites: action.value,
    };
  }

  return state;
};
