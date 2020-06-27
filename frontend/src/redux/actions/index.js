import axios from 'axios';
import {
  GET_PRODUCTS,
  ADD_TO_CART,
  SORT_LOW_TO_HIGH,
  SET_MIN_PRICE,
  SET_MAX_PRICE,
  SORT_HIGH_TO_LOW,
  FILTERED_ARRAY,
  GET_BRAND,
  CHECKOUT,
  GET_COLOR
} from './types';

export const getProducts = () => {
  const response = axios.get('/products');
  return (dispatch) => {
    response
      .then((res) => {
        dispatch({
          type: GET_PRODUCTS,
          payload: res.data
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const addToCart = (product) => {
  return (dispatch) => {
    dispatch({
      type: ADD_TO_CART,
      payload: product
    });
  };
};

export const setMinPrice = (price) => {
  return (dispatch) => {
    dispatch({
      type: SET_MIN_PRICE,
      payload: price
    });
  };
};
export const setMaxPrice = (price) => {
  return (dispatch) => {
    dispatch({
      type: SET_MAX_PRICE,
      payload: price
    });
  };
};
export const setLowToHigh = (data) => {
  return (dispatch) => {
    dispatch({
      type: SORT_LOW_TO_HIGH,
      payload: data
    });
  };
};

export const setHighToLow = (data) => {
  return (dispatch) => {
    dispatch({
      type: SORT_HIGH_TO_LOW,
      payload: data
    });
  };
};

export const filteredArray = (data) => {
  return (disptach) => {
    disptach({
      type: FILTERED_ARRAY,
      payload: data
    });
  };
};

export const getBrand = (brand) => {
  return (dispatch) => {
    dispatch({
      type: GET_BRAND,
      payload: brand
    });
  };
};

export const checkOut = (array) => {
  return (dispatch) => {
    dispatch({
      type: CHECKOUT,
      payload: array
    });
  };
};

export const getColor = (data) => {
  return (dispatch) => {
    dispatch({
      type: GET_COLOR,
      payload: data
    });
  };
};
