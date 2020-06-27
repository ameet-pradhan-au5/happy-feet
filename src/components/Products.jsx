import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Typography, Paper, Grid } from '@material-ui/core';
import { getProducts } from '../redux/actions';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import { bindActionCreators } from 'redux';
import { grey, green } from '@material-ui/core/colors';
import { addToCart, setLowToHigh, setHighToLow } from '../redux/actions';
import { ToastsContainer, ToastsStore } from 'react-toasts';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150
  },
  headings: {
    padding: theme.spacing(2)
  },
  paper: {
    margin: theme.spacing(7),
    paddingBottom: theme.spacing(5)
  },
  card: {
    maxWidth: 300,
    margin: 'auto',
    transition: '0.3s',
    marginBottom: theme.spacing(3)
  },
  media: {
    paddingTop: '56.25%'
  },
  content: {
    textAlign: 'left',
    padding: theme.spacing(3)
  },
  divider: {
    margin: `${theme.spacing(3)}px 0`
  },
  heading: {
    fontWeight: 'bold'
  },
  subheading: {
    lineHeight: 1.8
  }
}));

const Products = (props) => {
  const {
    getProducts,
    products,
    addToCart,
    setLowToHigh,
    setHighToLow,
    filteredArrayFromStore
  } = props;

  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    if (mounted) getProducts();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLowToHigh = () => {
    let sortedArray = products.sort(
      (a, b) => a.productOriginalPrice - b.productOriginalPrice
    );
    setLowToHigh(sortedArray);
  };

  const handleHighToLow = () => {
    let dsortedarray = products.sort(
      (a, b) => b.productOriginalPrice - a.productOriginalPrice
    );
    setHighToLow(dsortedarray);
  };

  const buyProductHandler = (product) => {
    addToCart(product);
    ToastsStore.success('Added to Cart');
  };
  return (
    <Paper elevation={3} className={classes.paper}>
      <Typography variant='h6' color='primary' className={classes.headings}>
        Products
      </Typography>
      <Typography variant='body2' color='primary' className={classes.headings}>
        Sort By
        <Button onClick={handleLowToHigh}>Price - Low to High</Button>
        <Button onClick={handleHighToLow}>Price - High to Low</Button>
      </Typography>
      <Grid
        container
        direction='row'
        justify='center'
        alignItems='flex-start'
        className={classes.container}
      >
        {filteredArrayFromStore.length > 0 &&
          filteredArrayFromStore.map((product, index) => {
            return (
              <Card className={classes.card} key={index}>
                <CardMedia
                  className={classes.media}
                  image={product.productImage}
                />
                <CardContent className={classes.content}>
                  <Button
                    variant='contained'
                    color={'secondary'}
                    onClick={() => buyProductHandler(product)}
                  >
                    Buy
                  </Button>
                  <ToastsContainer store={ToastsStore} />
                  <Typography
                    className={'MuiTypography--heading'}
                    variant={'h6'}
                    gutterBottom
                    noWrap
                  >
                    {product.productName}
                  </Typography>
                  <Typography
                    className={'MuiTypography--subheading'}
                    variant={'caption'}
                  >
                    <div
                      style={{
                        height: '18px',
                        width: '18%',
                        backgroundColor: 'green',
                        color: 'white',
                        borderRadius: '2px',
                        fontWeight: 'bolder',
                        textAlign: 'center'
                      }}
                    >
                      {product.productRating}
                      <i
                        className='fa fa-star'
                        style={{ marginLeft: '2px' }}
                      ></i>
                    </div>
                  </Typography>
                  <Divider className={classes.divider} light />
                  <Typography variant='body1'>
                    <span style={{ fontWeight: 'bolder', margin: '0 3px' }}>
                      ₹
                      {Math.floor(
                        Number(product.productOriginalPrice) -
                          Number(product.productOriginalPrice) *
                            Number(product.productDiscount / 100)
                      )}
                    </span>
                    <small>
                      <del style={{ color: grey }}>
                        ₹{product.productOriginalPrice}
                      </del>
                    </small>
                    <span style={{ fontWeight: 'bolder', color: green[400] }}>
                      {` ${product.productDiscount}`}% off
                    </span>
                  </Typography>
                </CardContent>
              </Card>
            );
          })}
      </Grid>
    </Paper>
  );
};

Products.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired,
  filteredArrayFromStore: PropTypes.array.isRequired,
  getProducts: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  setLowToHigh: PropTypes.func.isRequired,
  setHighToLow: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart,
  filteredArrayFromStore: state.filteredArray
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getProducts, addToCart, setLowToHigh, setHighToLow },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Products);
