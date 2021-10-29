import React from 'react';

function TabPanel(props) {
  console.log(props);
  const { children, value, index, ...other } = props;
  if (value !== index) {
    return (
      <div
        role="tabpanel"
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}></div>
    );
  }
  return (
    <div
      role="tabpanel"
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {children}
    </div>
  );
}

export default TabPanel;
