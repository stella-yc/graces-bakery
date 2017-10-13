import axios from 'axios';

/*** ACTION TYPES ***/
const GET_PRODUCTS = 'GET_PRODUCTS';
const GET_PRODUCT = 'GET_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
const DELETE_PRODUCT = 'DELETE_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

/*** INITIAL STATE ***/
const defaultState = {
  products: [],
  product: {}
};

/*** ACTION CREATORS ***/
const getProducts = products => ({type: GET_PRODUCTS, products});
const getProductById = product => ({type: GET_PRODUCT, product});
const addProduct = product => ({type: ADD_PRODUCT, product});
const updateProduct = product => ({type: UPDATE_PRODUCT, product});
const deleteProduct = product => ({type: DELETE_PRODUCT, product});
export const clearProductStore = () => ({type: CLEAR_PRODUCT });

/*** THUNK CREATORS ***/
export const allProducts = () =>
  dispatch =>
    axios.get('/api/products/')
      .then(res => dispatch(getProducts(res.data)))
      .catch(err => console.log(err));

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
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PRODUCTS:
      newState.products = action.products;
      break;
    case GET_PRODUCT:
      newState.product = action.product;
      break;
    case ADD_PRODUCT:
      newState.product = action.product;
      break;
    case UPDATE_PRODUCT:
      newState.product = action.product;
      break;
    case CLEAR_PRODUCT:
      newState.product = defaultState;
      break;
    case DELETE_PRODUCT: {
      let filteredProd = newState.products.filter(prod => {
        return prod.id !== action.product.id;
      });
      newState.products = filteredProd;
      newState.product = {};
      break;
    }
    default:
      return newState;
  }
    return newState;
}
