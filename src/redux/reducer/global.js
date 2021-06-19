const initGlobalState = {
  isLoading: false,
};

export const globalReducer = (state = initGlobalState, action) => {
  if (action.type === 'SET_LOADING') {
    return {
      ...state,
      isLoading: action.value,
    };
  }
  return state;
};
