import { Checkbox } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

const CustomCheckBox = withStyles({
  root: {
    paddingBottom: 4,
    paddingTop: 4
  }
})((props) => <Checkbox {...props} />);

export default CustomCheckBox;
