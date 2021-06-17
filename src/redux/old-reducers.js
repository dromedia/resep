import {Action} from './actions';

const initialState = {
  recipes: [],
  favorite: [],
  users: [],
  namaku: 'Andi',
  filterData: [],
  masterData: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case Action.GET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case Action.ADD_TO_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, action.payload],
      };
    case Action.REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorite: state.favorite.filter(
          recipe => recipe.id !== action.payload.id,
        ),
      };
    case Action.UPDATE_NAMA:
      return {
        ...state,
        namaku: 'Nurcholis',
      };
    default:
      return state;
  }
}
