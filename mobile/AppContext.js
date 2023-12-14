import React from 'react';

const AppContext = React.createContext({
  userToken: '',
  setUserToken: () => {},

  selectedFam: '',
  setSelectedFam: () => {},
});

export default AppContext;