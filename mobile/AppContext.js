import React from 'react';

const AppContext = React.createContext({
  userToken: '',
  setUserToken: () => {},

  selectedBFam: '',
  setSelectedBFam: () => {},

  userID: '',
  setUserID: () => {},
});

export default AppContext;