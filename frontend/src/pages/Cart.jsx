import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkOut } from '../redux/actions';
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
  },
  orders: {
    display: 'flex',
    margin: theme.spacing(2)
  },
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));

const Cart = (props) => {
  const { cart, orders, checkOut } = props;
  const classes = useStyles();

  const CheckoutHandler = () => {
    checkOut(cart);
  };

  useEffect(() => {
    let mounted = true;
    if (mounted)
      return () => {
        mounted = false;
      };
  }, [orders]);

  return (
    <>
      <Typography variant='h6' color='primary' className={classes.headings}>
        Products
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-start'
        className={classes.container}
      >
        {cart.length > 0 &&
          cart.map((product, index) => {
            return (
              <Grid item sm={12} xs={12} key={index}>
                <Card className={classes.root}>
                  {/* <CardMedia
                    className={classes.media}
                    image={product.productImage}
                    title='product'
                  /> */}
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='h2'>
                      {product.productName}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Seller: {product.productBrand}
                    </Typography>
                    <Typography
                      variant='body2'
                      color='textSecondary'
                      component='p'
                    >
                      Color: {product.productColor}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography
                      variant='h5'
                      color='textSecondary'
                      component='h5'
                    >
                      Rs:{' '}
                      {Math.floor(
                        Number(product.productOriginalPrice) -
                          Number(product.productOriginalPrice) *
                            Number(product.productDiscount / 100)
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        <Button color='secondary' component={Link} to='/' variant='outlined'>
          <HomeIcon />
          Go Back Home
        </Button>
        <Button
          color='secondary'
          onClick={() => CheckoutHandler()}
          variant='outlined'
        >
          Checkout
        </Button>
      </Grid>
      <Typography variant='h6' color='primary' className={classes.orders}>
        Previous Orders
      </Typography>
      <Grid
        container
        direction='column'
        justify='center'
        alignItems='flex-start'
        className={classes.container}
      >
        <Grid item sm={12} xs={12}>
          {orders.length > 0 &&
            orders.map((order) => {
              return order.map((product, index) => {
                return (
                  <Grid item key={index}>
                    <Typography
                      variant='body1'
                      color='primary'
                      // className={classes.orders}
                    >
                      {product.productName} ₹ {product.productOriginalPrice}
                    </Typography>
                  </Grid>
                );
              });
            })}
        </Grid>
      </Grid>
    </>
  );
};

Cart.propTypes = {
  cart: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  orders: state.orders
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ checkOut }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
