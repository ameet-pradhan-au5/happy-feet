import { applyMiddleware, createStore } from 'redux';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  SORT_LOW_TO_HIGH,
  SET_MIN_PRICE,
  SET_MAX_PRICE,
  SORT_HIGH_TO_LOW,
  FILTERED_ARRAY,
  GET_BRAND,
  CHECKOUT
} from './actions/types';
import thunk from 'redux-thunk';

const initialState = {
  products: [],
  cart: [],
  minPrice: 100,
  maxPrice: 3000,
  minPriceArray: [100, 200, 500, 1000],
  maxPriceArray: [1000, 1500, 2000, 3000],
  filteredArray: [],
  brand: 'fila',
  orders: []
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: [...action.payload],
        filteredArray: [...action.payload]
      };
    case ADD_TO_CART:
      return { ...state, cart: [...state.cart, action.payload] };
    case SET_MIN_PRICE:
      return {
        ...state,
        minPrice: action.payload
      };
    case SET_MAX_PRICE:
      return {
        ...state,
        maxPrice: action.payload
      };

    case SORT_LOW_TO_HIGH:
      return {
        ...state,
        filteredArray: [...action.payload]
      };
    case SORT_HIGH_TO_LOW:
      return {
        ...state,
        filteredArray: [...action.payload]
      };
    case FILTERED_ARRAY:
      return {
        ...state,
        filteredArray: [...action.payload]
      };
    case GET_BRAND:
      return {
        ...state,
        brand: action.payload
      };
    case CHECKOUT:
      return {
        ...state,
        orders: [...state.orders, [...action.payload]],
        cart: []
      };
    default:
      return { ...state };
  }
};

const store = createStore(ProductReducer, applyMiddleware(thunk));

export default store;
