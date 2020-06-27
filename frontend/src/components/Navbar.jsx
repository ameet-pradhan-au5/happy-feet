import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  badge: {
    marginRight: theme.spacing(2)
  }
}));

const Navbar = (props) => {
  const classes = useStyles();

  const { cart } = props;

  let notifications = cart.length;
  return (
    <div className={classes.root}>
      <AppBar position='sticky'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
          >
            <MenuIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Happy Feet | Products
          </Typography>
          <Button color='inherit' component={Link} to='/cart'>
            <Badge
              badgeContent={notifications}
              color='secondary'
              className={classes.badge}
            >
              <ShoppingCartIcon />
            </Badge>
            Cart
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Navbar.propTypes = {
  cart: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  cart: state.cart
});

export default connect(mapStateToProps)(Navbar);
