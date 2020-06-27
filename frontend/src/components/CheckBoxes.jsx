import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from 'react-redux';
import { green, red, grey, blue, yellow } from '@material-ui/core/colors';
import { FormGroup, FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import { Typography } from '@material-ui/core';
import { filteredArray } from '../redux/actions';
import { bindActionCreators } from 'redux';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const RedCheckbox = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const GreyCheckbox = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);
const BlackCheckbox = withStyles({
  root: {
    color: 'black',
    '&$checked': {
      color: 'black'
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const BeigeCheckbox = withStyles({
  root: {
    color: '#cfb997',
    '&$checked': {
      color: '#cfb997'
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const BlueCheckbox = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const YellowCheckbox = withStyles({
  root: {
    color: yellow[400],
    '&$checked': {
      color: yellow[600]
    }
  },
  checked: {}
})((props) => <Checkbox color='default' {...props} />);

const CheckBoxes = (props) => {
  const [state, setState] = React.useState({
    Green: true,
    Red: true,
    Grey: true,
    Black: true,
    Beige: true,
    Blue: true,
    Yellow: true
  });
  const { filteredArray, products } = props;

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  function getMatching(obj, value) {
    let result;
    result = Object.getOwnPropertyNames(obj).filter(
      (key) => obj[key] === value
    );
    return result;
  }

  const colorArray = getMatching(state, true);

  const changeColor = () => {
    let array = products.filter((product) => {
      return (
        product.productColor ===
        colorArray[colorArray.indexOf(product.productColor)]
      );
    });
    return array;
  };

  useEffect(() => {
    let mounted = true;
    if (mounted) filteredArray(changeColor());
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <Typography
        variant='body1'
        color='primary'
        className={props.classes.headings}
      >
        COLOR
      </Typography>
      <FormGroup className={props.classes.formControl}>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.Green}
              onChange={handleChange}
              name='Green'
            />
          }
          label='Green'
        />
        <FormControlLabel
          control={
            <RedCheckbox
              checked={state.Red}
              onChange={handleChange}
              name='Red'
            />
          }
          label='Red'
        />
        <FormControlLabel
          control={
            <GreyCheckbox
              checked={state.Grey}
              onChange={handleChange}
              name='Grey'
            />
          }
          label='Grey'
        />
        <FormControlLabel
          control={
            <BlackCheckbox
              checked={state.Black}
              onChange={handleChange}
              name='Black'
            />
          }
          label='Black'
        />
        <FormControlLabel
          control={
            <BeigeCheckbox
              checked={state.Beige}
              onChange={handleChange}
              name='Beige'
            />
          }
          label='Beige'
        />
        <FormControlLabel
          control={
            <BlueCheckbox
              checked={state.Blue}
              onChange={handleChange}
              name='Blue'
            />
          }
          label='Blue'
        />
        <FormControlLabel
          control={
            <YellowCheckbox
              checked={state.Yellow}
              onChange={handleChange}
              name='Yellow'
            />
          }
          label='Yellow'
        />
      </FormGroup>
    </>
  );
};

CheckBoxes.propTypes = {
  filteredArray: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (disptach) => {
  return bindActionCreators({ filteredArray }, disptach);
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckBoxes);
