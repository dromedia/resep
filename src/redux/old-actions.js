import axios from 'axios';
import {BASE_URL} from '../utilities';

export const Action = {
  GET_RECIPES: 'fetch_recipes',
  ADD_TO_FAVORITE: 'add_to_favorite',
  REMOVE_FROM_FAVORITE: 'remove_from_favorite',
  ON_ERROR: 'on_error',
  SEARCH_RECIPES: 'search_recipe',
  UPDATE_NAMA: 'UPDATE_NAMA',
};

export const fetchRecipes = () => {
  try {
    return async dispatch => {
      const response = await axios.get(`${BASE_URL}`);

      if (response.data) {
        dispatch({
          type: Action.GET_RECIPES,
          payload: response.data,
        });
      } else {
        //throw error
        dispatch({
          type: Action.ON_ERROR,
          payload: 'Unable to fetch recipe',
        });
      }
    };
  } catch (err) {
    //throw error
    dispatch({
      type: Action.ON_ERROR,
      payload: 'Unable to fetch recipe',
    });
  }
};

export const addToFavorite = recipe => dispatch => {
  dispatch({
    type: Action.ADD_TO_FAVORITE,
    payload: recipe,
  });
};

export const removeFromFavorite = recipe => dispatch => {
  dispatch({
    type: Action.REMOVE_FROM_FAVORITE,
    payload: recipe,
  });
};
