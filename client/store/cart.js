import axios from 'axios';

/*** ACTION TYPES ***/
const GET_CART = 'GET_CART';
const UPDATE_CART = 'UPDATE_CART';
const REMOVE_CART_PRODUCT = 'REMOVE_CART_PRODUCT';
const REMOVE_CART = 'REMOVE_CART';

/*** INITIAL STATE ***/
const defaultCart = {};

/*** ACTION CREATORS ***/
const getCart = cart => ({ type: GET_CART, cart });
const updateCart = cart => ({ type: UPDATE_CART, cart });
const removeCartProduct = prodInfo => ({ type: REMOVE_CART_PRODUCT, prodInfo});
export const removeCart = () => ({ type: REMOVE_CART });

/*** THUNK CREATORS ***/
export const callGetCart = () =>
  dispatch =>
    axios.get('/api/cart/')
      .then(res =>
        dispatch(getCart(res.data)))
      .catch(err => console.log(err));

export const addProductToCart = (cid, productInfo) =>
  dispatch =>
    axios.put(`/api/cart/${cid}/addProduct`, productInfo)
      .then(res =>
        dispatch(updateCart(res.data)))
      .catch(err => console.log(err));


export const sendUpdatedCart = (cid, productInfo) =>
  dispatch =>
    axios.put(`/api/cart/${cid}/editCart`, productInfo)
      .then(res =>
        dispatch(updateCart(res.data)))
      .catch(err => console.log(err));

export const removeProduct = (cid, productId) =>
  dispatch =>
    axios.put(`/api/cart/${cid}/removeProduct`, productId)
      .then(() =>
        dispatch(removeCartProduct(productId)))
      .catch(err => console.log(err));

/*** REDUCER ***/
export default function (state = defaultCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cart;
    case UPDATE_CART:
      return action.cart;
    case REMOVE_CART_PRODUCT: {
      let pid = +action.prodInfo.productId;
      let filteredProd = state.products.filter(prod => {
        let prodId = +prod.id;
        return prodId !== pid;
      });
      let newState = Object.assign({}, state);
      newState.products = filteredProd;
      return newState;
    }
    case REMOVE_CART:
      return defaultCart;
    default:
      return state;
  }
}
