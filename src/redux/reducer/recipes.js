const initRecipes = {
  recipes: [],
};

export const recipesReducer = (state = initRecipes, action) => {
  if (action.type === 'SET_RECIPES') {
    return {
      ...state,
      recipes: action.value,
    };
  }

  return state;
};
