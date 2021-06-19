import axios from 'axios';

export const getRecipesData = recipe => dispatch => {
  axios
    .get('https://dromedia.co/app/kebab.json')
    .then(res => {
      dispatch({
        type: 'GET_RECIPES',
        value: res.data,
      });
    })
    .catch(err => {
      console.log('Error: ', err);
    });
};
