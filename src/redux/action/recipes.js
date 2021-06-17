import axios from 'axios';

export const searchRecipe = text => dispatch => {
  dispatch({
    type: 'SEARCH_RECIPE',
    action: text,
  });
};

export const fetchRecipes = text => dispatch => {
  axios
    .get('https://dromedia.co/app/kebab.json')
    .then(res => {
      dispatch({
        type: 'FETCH_RECIPES',
        value: res.data,
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    });
};
