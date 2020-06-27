import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProducts } from '../redux/actions';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Filters from '../components/Filters';
import Products from '../components/Products';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  container: {
    padding: theme.spacing(1)
  },
  title: {
    flexGrow: 1
  }
}));

export const Home = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction='row'
      justify='center'
      alignItems='flex-start'
      className={classes.container}
    >
      <Grid item sm={3} xs={12}>
        <Filters />
      </Grid>
      <Grid item sm={9} xs={12}>
        <Products />
      </Grid>
    </Grid>
  );
};

Home.propTypes = {
  products: PropTypes.array.isRequired,
  cart: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products,
  cart: state.cart
});

export default connect(mapStateToProps, { getProducts })(Home);
