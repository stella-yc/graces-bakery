import axios from 'axios';

/*** ACTION TYPES ***/
const PRODUCTS_BY_CAT = 'PRODUCTS_BY_CAT';

/*** INITIAL STATE ***/
const defaultState = {};

/*** ACTION CREATORS ***/
const getProductsByCat = category => ({type: PRODUCTS_BY_CAT, category});

/*** THUNK CREATORS ***/
export const categoryProducts = (name) =>
  dispatch =>
    axios.get(`/api/categories/${name}`)
      .then(res => dispatch(getProductsByCat(res.data)))
      .catch(err => console.log(err));

/*** REDUCER ***/
export default function (state = defaultState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case PRODUCTS_BY_CAT:
      return action.category;
    default:
      return newState;
  }
}
