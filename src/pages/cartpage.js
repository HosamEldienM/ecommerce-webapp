import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import CartItem from "../components/cartitem";

import { CartContext } from "../contexts/cartcontext";
import { LangContext } from "../contexts/contexts";

const CartPage = () => {
  const { Lang } = useContext(LangContext);
  const { Cart, getCart, totlaPrice } = useContext(CartContext);

  const history = useHistory();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="row  col-lg-9 myshadow bgtwo  justify-content-around rounded m-auto pt-4 pb-5 ">
      <h1 className="txtone text-center p-2">
        {Lang === "en" ? "Cart" : "عربة التسوق"}
      </h1>
      {Cart.length === 0 && (
        <div className="h1 text-center txtone p-4 ">
          {Lang === "en" ? "Your cart is empty :(" : "عربة تسوقك فارغة :("}
          <br />
          <div
            className="btn btn-outline-one mt-4 "
            onClick={() => history.push("./products")}
          >
            {Lang === "en" ? "GO Shopping" : "تسوق الآن"}
          </div>
        </div>
      )}

      {Cart.length > 0 && (
        <>
          <div className=" col-12 col-sm-10 col-lg-7  ">
            {Cart.map((product, index) => (
              <CartItem product={product} key={index} />
            ))}
          </div>
          <div className=" col-8 col-lg-4 shadow  bg-white p-2 rounded m-4 h-25 text-center mt-3">
            <div className=" h4 m-3">
              {Lang === "en" ? "Totla Price " : "الإجمالي  "}
              {totlaPrice()}
              <span className="h6">{Lang == "en" ? " EGP" : "  جنيه"}</span>
            </div>
            <div hidden={totlaPrice() == 0}>
              <div
                className="btn btn-one  mt-4 mb-3"
                onClick={() => history.push("./checkout")}
              >
                {Lang === "en" ? "PROCEED TO CHECKOUT" : "الانتقال للدفع"}
              </div>
              <br />
              <div
                className="btn btn-outline-one border-0   mb-3"
                onClick={() => history.push("./products")}
              >
                {Lang === "en" ? "Continue Shopping" : "الاستمرار في التسوق"}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
