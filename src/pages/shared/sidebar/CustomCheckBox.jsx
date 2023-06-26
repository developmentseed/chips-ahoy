import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

const CustomCheckBox = withStyles({
  root: {
    paddingBottom: 4,
    paddingTop: 4
  }
})((props) => <Checkbox {...props} />);

export default CustomCheckBox;
