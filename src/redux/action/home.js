import axios from 'axios';

export const getRecipesData = recipe => dispatch => {
  axios
    .get('https://dromedia.co/app/kebab.json')
    .then(res => {
      dispatch({
        type: 'GET_RECIPES',
        value: res.data,
      });
      dispatch({
        type: 'SET_MASTER_DATA',
        value: res.data,
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    });
};

export const searchRecipes = text => dispatch => {
  console.log('searchRecipes has been called ');
  dispatch({
    type: 'SEARCH_RECIPES',
    value: text,
  });
};

export const addToFavorite = recipe => dispatch => {
  dispatch({
    type: 'ADD_TO_FAV',
    action: recipe,
  });
};

export const removeFromFavorite = recipe => dispatch => {
  dispatch({
    type: 'REMOVE_FROM_FAV',
    action: recipe,
  });
};
