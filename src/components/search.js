import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { LangContext } from "../contexts/contexts";

import { SearchContext } from "../contexts/searchcontext";

const Search = () => {
  const history = useHistory();
  const { SearchText, setSearchText } = useContext(SearchContext);
  const { Lang } = useContext(LangContext);

  const search = (e) => {
    history.push("../products");
    setSearchText(e.target.value);
  };
  return (
    <div className="input-group  col-12 position-relative">
      <input
        className="form-control "
        placeholder={Lang === "en" ? "Search products" : "ابحث في المنتجات"}
        onChange={(e) => search(e)}
        value={SearchText}
      />

      <i className="fa fa-search bgone p-2 text-white rounded"></i>
    </div>
  );
};

export default Search;
