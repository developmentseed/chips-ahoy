import { Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
      underline={underline}
    >
      {children}
    </Link>
  );
}

const useStyles = makeStyles(() => ({
  link: {
    fontWeight: 500,
    fontSize: '0.875rem',
    textTransform: 'uppercase'
  }
}));

export default CustomLink;
