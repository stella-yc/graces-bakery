import axios from 'axios';

/*** ACTION TYPES ***/
const ALL_CATEGORIES = 'ALL_CATEGORIES';

/*** INITIAL STATE ***/
const defaultState = [];

/*** ACTION CREATORS ***/
const getAllCategories = categories => ({type: ALL_CATEGORIES, categories});

/*** THUNK CREATORS ***/
export const allCategories = () =>
  dispatch =>
    axios.get('/api/categories/')
      .then(res => dispatch(getAllCategories(res.data)))
      .catch(err => console.log(err));

/*** REDUCER ***/
export default function (state = defaultState, action) {
  switch (action.type) {
    case ALL_CATEGORIES:
      return action.categories;
    default:
      return state;
  }
}
