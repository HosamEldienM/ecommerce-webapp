import { useContext, useEffect } from "react";
import HomeCarousel from "../components/Carousel";
import { CartContext } from "../contexts/cartcontext";
import { WishListContext } from "../contexts/wishlistcontext";
import { ProductsContext } from "../contexts/productscontext";
import ProductCard from "../components/productcard";
import { LangContext } from "../contexts/contexts";
import Categories from "../components/categories";
import Gender from "../components/gender";

const Home = () => {
  const { Products, getProducts } = useContext(ProductsContext);
  const { getCart } = useContext(CartContext);
  const { getWishList } = useContext(WishListContext);
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <HomeCarousel />
      {/******************* Categories Section ********************/}
      <Categories />
      {/******************* Gender Section ********************/}
      <Gender />
      {/******************* New Items Section ********************/}
      <div className=" myshadow p-5">
        <h2 className="txtone text-center p-4">
          {Lang === "en" ? "Latest Products" : "أحدث منتجاتنا"}
        </h2>
        <div className="row m-0 text-center px-sm-5  justify-content-around ">
          {Products.sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, 3)
            .map((product, index) => (
              <ProductCard product={product} Lang={Lang} key={index} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
