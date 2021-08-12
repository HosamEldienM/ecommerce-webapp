import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ProductCard from "../components/productcard";
import { LangContext } from "../contexts/contexts";
import { WishListContext } from "../contexts/wishlistcontext";

const WishList = () => {
  useEffect(() => {
    getWishList();
  }, []);
  const { Lang } = useContext(LangContext);
  const { WishList, getWishList } = useContext(WishListContext);
  const history = useHistory();
  return (
    <div className="row  col-lg-10 myshadow bgtwo m-auto justify-content-around rounded  pt-4 pb-5 ">
      <h1 className="txtone text-center p-2">
        {Lang == "en" ? "Wishlist" : "قائمة الرغبات"}
      </h1>
      {WishList.length === 0 && (
        <div className="h1 text-center  txtone p-4 ">
          {Lang == "en"
            ? "Your Wish list is empty :("
            : "قائمة رغباتك فارغة :("}
          <br />
          <div
            className="btn btn-outline-one mt-4 "
            onClick={() => history.push("../products")}
          >
            {Lang == "en" ? "GO Shopping" : "تسوق الآن"}
          </div>
        </div>
      )}

      {WishList.length > 0 && (
        <>
          <div className=" row m-0 justify-content-around  text-center">
            {WishList.map((product, index) => (
              <ProductCard
                product={product}
                key={index}
                wihsist={true}
                Lang={Lang}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WishList;
