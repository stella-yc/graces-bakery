import axios from 'axios';

/*** ACTION TYPES ***/
const GET_PRODUCT = 'GET_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

/*** INITIAL STATE ***/
const defaultState = {};

/*** ACTION CREATORS ***/
const getProductById = product => ({type: GET_PRODUCT, product});
const addProduct = product => ({type: ADD_PRODUCT, product});
const updateProduct = product => ({type: UPDATE_PRODUCT, product});
const deleteProduct = product => ({type: DELETE_PRODUCT, product});
export const clearProductStore = () => ({type: CLEAR_PRODUCT });

/*** THUNK CREATORS ***/
export const singleProduct = (pid) =>
  dispatch =>
    axios.get(`/api/products/${pid}`)
      .then(res => dispatch(getProductById(res.data)))
      .catch(error =>
        dispatch(getProductById({error})));

export const newProduct = (productInfo) =>
  dispatch =>
    axios.post('/api/products/', productInfo)
      .then((res) => dispatch(addProduct(res.data)))
      .catch(err => console.log(err));

export const updateProductInfo = (productInfo) =>
  dispatch =>
    axios.put(`/api/products/${productInfo.id}`, productInfo)
      .then((res) => dispatch(updateProduct(res.data)))
      .catch(err => console.log(err));

export const deleteProductInfo = (productInfo) =>
  dispatch =>
    axios.delete(`/api/products/${productInfo.id}`)
      .then(() => dispatch(deleteProduct(productInfo)))
      .catch(err => console.log(err));

/*** REDUCER ***/
export default function (state = defaultState, action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;
    case ADD_PRODUCT:
      return action.product;
    case UPDATE_PRODUCT:
      return action.product;
    case CLEAR_PRODUCT:
      return defaultState;
    case DELETE_PRODUCT: {
      return defaultState;
    }
    default:
      return state;
  }
}
