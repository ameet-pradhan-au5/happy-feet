import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { TextField } from '@material-ui/core';
import CheckBoxes from './CheckBoxes';
import { setMinPrice, setMaxPrice, filteredArray } from '../redux/actions';
import { bindActionCreators } from 'redux';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  headings: {
    padding: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(7)
  }
}));

const Filters = (props) => {
  const classes = useStyles();
  const [brand, setBrand] = useState('');
  const {
    minPriceArray,
    maxPriceArray,
    maxPrice,
    minPrice,
    setMinPrice,
    setMaxPrice,
    products,
    filteredArray
  } = props;

  const handlerMinPrice = (e) => {
    setMinPrice(e.target.value);
  };
  var range = [];
  const handlerMaxPrice = (e) => {
    setMaxPrice(e.target.value);
  };

  useEffect(() => {
    let mounted = true;
    const findProductByBrand = () => {
      let array = products.filter(
        (product) =>
          product.productBrand.toLowerCase() === brand.toLocaleLowerCase()
      );
      if (mounted) filteredArray(array);
    };
    findProductByBrand();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [brand]);

  useEffect(() => {
    let mounted = true;
    function newFunction(products, range, minPrice, maxPrice, filteredArray) {
      if (products.length) {
        products.forEach((product) => {
          const copy = {
            ...product,
            discountedPrice: Math.floor(
              Number(product.productOriginalPrice) -
                Number(product.productOriginalPrice) *
                  Number(product.productDiscount / 100)
            )
          };
          range.push(copy);
        });
      }
      let filtered = range.filter(
        (product) =>
          Number(product.discountedPrice) >= Number(minPrice) &&
          Number(product.discountedPrice) <= Number(maxPrice)
      );
      if (mounted) {
        filteredArray(filtered);
      }
    }
    newFunction(products, range, minPrice, maxPrice, filteredArray);
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxPrice, minPrice]);

  return (
    <>
      <Paper elevation={3} className={classes.paper}>
        <Typography variant='h6' color='primary' className={classes.headings}>
          Filters
        </Typography>
        <Divider />
        {/*//* Min Price range */}
        <Typography
          variant='body1'
          color='primary'
          className={classes.headings}
        >
          PRICE
        </Typography>

        <FormControl className={classes.formControl}>
          <InputLabel id='demo-simple-select-helper-label'>Min</InputLabel>
          <Select
            labelId='demo-simple-select-helper-label'
            id='demo-simple-select-helper'
            value={minPrice}
            onChange={(e) => handlerMinPrice(e)}
            required
          >
            {minPriceArray &&
              minPriceArray.map((price, index) => {
                return (
                  <MenuItem value={price} key={index}>
                    {price}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        {/* //* maxprice range */}
        <FormControl className={classes.formControl}>
          <InputLabel id='simple-select-helper-label'>Max</InputLabel>
          <Select
            labelId='simple-select-helper-label'
            id='demo-simple-select-helper'
            value={maxPrice}
            onChange={(e) => handlerMaxPrice(e)}
            required
          >
            {maxPriceArray &&
              maxPriceArray.map((price, index) => {
                return (
                  <MenuItem value={price} key={index}>
                    {price}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>

        <Divider />
        {/* //* brand name */}
        <Typography
          variant='body1'
          color='primary'
          className={classes.headings}
        >
          BRAND
        </Typography>
        <TextField
          className={classes.formControl}
          id='outlined-basic'
          label='Brand'
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          autoComplete='off'
        />
        <Divider />
        <CheckBoxes classes={classes} />
      </Paper>
    </>
  );
};

Filters.propTypes = {
  //   prop: PropTypes
};

const mapStateToProps = (state) => ({
  minPrice: state.minPrice,
  maxPrice: state.maxPrice,
  minPriceArray: state.minPriceArray,
  maxPriceArray: state.maxPriceArray,
  products: state.products
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { setMinPrice, setMaxPrice, filteredArray },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
