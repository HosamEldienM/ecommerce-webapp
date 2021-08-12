import React, { useContext, useEffect, useMemo, useState } from "react";

import { LangContext } from "../contexts/contexts";
import Pagination from "../components/pagination";
import { ProductsContext } from "../contexts/productscontext";
import { CartContext } from "../contexts/cartcontext";
import ProductCard from "../components/productcard";
import { SearchContext } from "../contexts/searchcontext";
import { useLocation } from "react-router-dom";
import { WishListContext } from "../contexts/wishlistcontext";

const HomePage = () => {
  const { getCart } = useContext(CartContext);
  const { getWishList } = useContext(WishListContext);
  const { Lang } = useContext(LangContext);
  const [CurrentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage, setProductsPerPage] = useState(12);
  const { Products, getProducts } = useContext(ProductsContext);
  const [Sort, setSort] = useState("newest");
  const { SearchText, setSearchText } = useContext(SearchContext);
  const [CategoryFilter, setCategoryFilter] = useState({
    accessories: false,
    clothes: false,
    home: false,
  });
  const location = useLocation();
  const [GenderFilter, setGenderFilter] = useState({
    men: false,
    women: false,
  });

  useEffect(() => {
    getProducts();
    getCart();
    getWishList();
    if (location.state) {
      if (location.state.category === "accessories")
        setCategoryFilter({
          ...CategoryFilter,
          accessories: !CategoryFilter.accessories,
        });
      else if (location.state.category === "home")
        setCategoryFilter({ ...CategoryFilter, home: true });
      else if (location.state.category === "clothes")
        setCategoryFilter({ ...CategoryFilter, clothes: true });
      if (location.state.gender === "men")
        setGenderFilter({ men: true, women: false });
      else if (location.state.gender === "women")
        setGenderFilter({ men: false, women: true });
    }

    return () => {
      setSearchText("");
    };
  }, []);

  ///////category filter///////////
  const FilteredByCategory = useMemo(() => {
    if (
      !CategoryFilter.accessories &&
      !CategoryFilter.clothes &&
      !CategoryFilter.home
    )
      return Products;
    else
      return Products.filter(
        (product) =>
          (CategoryFilter.accessories && product.Category === "category1") ||
          (CategoryFilter.clothes && product.Category === "category2") ||
          (CategoryFilter.home && product.Category === "category3")
      );
  }, [CategoryFilter, Products, GenderFilter, Sort, SearchText]);
  ///////Gender filter///////////
  const FilteredByGender = useMemo(() => {
    if (!GenderFilter.men && !GenderFilter.women) return FilteredByCategory;
    else
      return FilteredByCategory.filter(
        (product) =>
          (GenderFilter.men && product.Gender === "male") ||
          (GenderFilter.women && product.Gender === "female") ||
          product.Gender === "unisex"
      );
  }, [CategoryFilter, Products, GenderFilter, Sort, SearchText]);
  ///////sorting///////////
  const SortedList = useMemo(() => {
    switch (Sort) {
      case "lowest price":
        return FilteredByGender.sort((a, b) => a.Price - b.Price);
      case "highest price":
        return FilteredByGender.sort((a, b) => b.Price - a.Price);
      case "newest":
        return FilteredByGender.sort((a, b) => b.timestamp - a.timestamp);
      case "most purchased":
        return FilteredByGender.sort((a, b) => b.Purchses - a.Purchses);
    }
  }, [CategoryFilter, GenderFilter, Sort, Products, SearchText]);

  ////////////Search///////////////
  const SearchResult = useMemo(() => {
    if (SearchText)
      return SortedList.filter(
        (product) =>
          product.EnName.toLowerCase().includes(SearchText.toLowerCase()) ||
          product.ArName.includes(SearchText)
      );
    else return SortedList;
  }, [CategoryFilter, GenderFilter, Sort, Products, SearchText]);
  // for pagination
  const IndexOfLastProduct = ProductsPerPage * CurrentPage;
  const IndexOfFirstProduct = IndexOfLastProduct - ProductsPerPage;
  const CurrentProducts = SearchResult.slice(
    IndexOfFirstProduct,
    IndexOfLastProduct
  );
  const paginate = (PageNumber) => {
    setCurrentPage(PageNumber);
  };

  return (
    <div className=" row p-0 m-0 flex-grow-1">
      <div className=" col-sm-3 col-lg-2 bgtwo shadow rounded py-3 ">
        <div className="row ">
          {/******************* Category Filter *******************/}
          <div className="col-6 col-sm-12 ">
            <h5>{Lang === "en" ? "Category:" : "الفئة:"}</h5>
            <div className=" form-check ms-1">
              <input
                className="form-check-input"
                checked={CategoryFilter.accessories}
                type="checkbox"
                onChange={() =>
                  setCategoryFilter({
                    ...CategoryFilter,
                    accessories: !CategoryFilter.accessories,
                  })
                }
              />
              <label className="form-check-label">
                {Lang === "en" ? "Accessories" : "إكسسوارات"}
              </label>
            </div>
            <div className="form-check ms-1">
              <input
                className="form-check-input"
                checked={CategoryFilter.clothes}
                type="checkbox"
                onChange={() =>
                  setCategoryFilter({
                    ...CategoryFilter,
                    clothes: !CategoryFilter.clothes,
                  })
                }
              />

              <label className="form-check-label">
                {Lang === "en" ? "Clothes" : "ملابس"}
              </label>
            </div>
            <div className="form-check ms-1">
              <input
                className="form-check-input"
                checked={CategoryFilter.home}
                type="checkbox"
                onChange={() =>
                  setCategoryFilter({
                    ...CategoryFilter,
                    home: !CategoryFilter.home,
                  })
                }
              />
              <label>
                {Lang === "en" ? "Home & Living" : "المنزل والمعيشة"}
              </label>
            </div>
            <hr className="d-none  d-sm-block" />
          </div>

          {/****************** Gender Filter ******************/}
          <div className="col-6 col-sm-12">
            <h5>{Lang === "en" ? "Targeted Group:" : "المجموعة المستهدفة:"}</h5>
            <div className=" form-check ms-1">
              <input
                className="form-check-input"
                checked={GenderFilter.men}
                type="checkbox"
                onChange={() =>
                  setGenderFilter({
                    ...GenderFilter,
                    men: !GenderFilter.men,
                  })
                }
              />
              <label className="form-check-label">
                {Lang === "en" ? "Men" : "الرجال"}
              </label>
            </div>
            <div className="form-check ms-1">
              <input
                className="form-check-input"
                checked={GenderFilter.women}
                type="checkbox"
                onChange={() =>
                  setGenderFilter({
                    ...GenderFilter,
                    women: !GenderFilter.women,
                  })
                }
              />

              <label className="form-check-label">
                {Lang === "en" ? "Women" : "النساء"}
              </label>
            </div>
          </div>
        </div>
      </div>
      <div className="row  justify-content-around col-sm-9 col-lg-10 text-center m-0 p-0 py-3">
        <div className="row justify-content-around m-0">
          {/************* sort menue *************/}
          <div className="col-5 col-lg-4  my-2 ">
            <div className=" input-group px-2 px-sm-0 px-lg-4">
              <label className="p-2 ">
                {Lang === "en" ? "Sort by" : "الترتيب حسب"}
              </label>
              <select
                className="form-select"
                onChange={(e) => setSort(e.target.value)}
                value={Sort}
              >
                <option value="newest">
                  {Lang === "en" ? "newest" : "الأحدث"}
                </option>
                <option value="lowest price">
                  {Lang === "en" ? "lowest price" : "الأقل سعراً"}
                </option>
                <option value="highest price">
                  {Lang === "en" ? "highest price" : "الأكثر سعراً"}
                </option>
                <option value="most purchased">
                  {Lang === "en" ? "most purchased" : "الأكثر شراءً"}
                </option>
              </select>
            </div>
          </div>
          {/********** products per page ************/}
          <div className="col-7 col-lg-4 my-2 ">
            <div className=" input-group px-lg-3">
              <label className="p-2 px-1">
                {Lang === "en" ? "Displayed Products" : "عدد المنتجات بالصفحة"}
              </label>
              <select
                className="form-select d-inline"
                onChange={(e) => {
                  setProductsPerPage(e.target.value);
                  setCurrentPage(1);
                }}
                value={ProductsPerPage}
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>
          </div>
        </div>
        <div className="row justify-content-around ">
          {!SearchResult[0] && (
            <h2 className="txtone">
              {Lang === "en" ? "No Products Found" : "لا توجد منتجات"}
            </h2>
          )}
          {CurrentProducts.map((product, index) => (
            <ProductCard product={product} Lang={Lang} key={index} />
          ))}
        </div>
        <div>
          <Pagination
            ProductsPerPage={ProductsPerPage}
            TotalProducts={SearchResult.length}
            paginate={paginate}
            CurrentPage={CurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
