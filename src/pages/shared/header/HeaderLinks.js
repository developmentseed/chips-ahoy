import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import { Link, Typography } from '@material-ui/core';

import { useLocation } from 'react-router-dom';

function CustomLink({ children, to }) {
  const location = useLocation();
  const classes = useStyles();
  const underline = location.pathname === to ? 'always' : 'hover';

  return (
    <Link
      className={classes.link}
      component={RouterLink}
      to={to}
      color="inherit"
      underline={underline}>
      {children}
    </Link>
  );
}

const HeaderLinks = () => {
  const classes = useStyles();

  return (
    <Typography className={classes.root}>
      <CustomLink to="/">Annotate</CustomLink>
      <CustomLink to="/validate">Validate</CustomLink>
    </Typography>
  );
};
const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  link: {
    fontWeight: 500,
    fontSize: '0.875rem',
    textTransform: 'uppercase'
  }
}));

export default HeaderLinks;
