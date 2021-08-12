import { useState } from "react";
import React from "react";
export const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
  const [SearchText, setSearchText] = useState("");

  const value = { SearchText, setSearchText };
  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
};
