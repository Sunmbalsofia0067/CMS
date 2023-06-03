import React, { createContext, useState } from 'react';

// Create a new context
const AppContext = createContext();

// Create a provider component
const AppContextProvider = ({ children }) => {
  const [data, setData] = useState({
    articles: [],
    user: null
  });



  const setArticles = (articles) => {
    setData({
        ...data,
        articles
    });
  };

  const setUserData = (user) => {
    setData({
        ...data,
        user
    });
  };

  return (
    <AppContext.Provider value={{ data, setUserData, setArticles }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };