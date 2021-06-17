const initHome = {
  recipes: [],
  favorite: [],
  filterData: [],
  masterData: [],
  text: '',
};

export const homeReducer = (state = initHome, action) => {
  if (action.type === 'GET_RECIPES') {
    return {
      ...state,
      recipes: action.value,
    };
  }
  if (action.type === 'ADD_TO_FAV') {
    return {
      ...state,
      favorite: [...state.favorite, action.value],
    };
  }
  if (action.type === 'REMOVE_FROM_FAV') {
    return {
      ...state,
      favorite: state.favorite.filter(recipe => recipe.id !== action.value.id),
    };
  }
  if (action.type === 'SEARCH_RECIPES') {
    return {
      ...state,
      text: action.value,
    };
  }

  return state;
};
