import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/config";
import { CartContext } from "../contexts/cartcontext";
import { LangContext, UserContext } from "../contexts/contexts";
import { WishListContext } from "../contexts/wishlistcontext";
import LangauageButton from "./langauagebutton";
import Search from "./search";
import UserMenu from "./usermenu";

const Navbar = () => {
  const { Cart, getCart } = useContext(CartContext);
  const { WishList, getWishList } = useContext(WishListContext);
  const history = useHistory();
  const [MenuToggle, setMenuToggle] = useState(true);
  const { Lang } = useContext(LangContext);

  useEffect(() => {
    getCart();
    getWishList();
  }, [auth.currentUser]);
  return (
    <div className=" bgone  row m-0 py-2 justify-content-between ">
      {/************** logo area***********/}
      <div className="col-6 col-lg-2  my-auto ">
        <h1 className=" link mylogo " onClick={() => history.push("../home")}>
          ASWANA
        </h1>
      </div>
      {/************** navigation area***********/}
      <div className="col-4 d-none d-lg-flex  text-light justify-content-center ">
        <button
          className="btn-one btn-lg btn  px-1 col-3 "
          onClick={() => history.push("../home")}
        >
          {Lang === "en" ? "Home" : "الرئيسية"}
        </button>
        <button
          className="btn-one btn-lg btn  px-1 col-3 "
          onClick={() => history.push("../products")}
        >
          {Lang === "en" ? "Shop" : "تسوق"}
        </button>
        <button
          className="btn-one btn-lg btn  px-1 col-3 "
          onClick={() => history.push("../about")}
        >
          {Lang === "en" ? "About" : "من نحن"}
        </button>
        <button
          className="btn-one btn-lg btn  px-1 col-3 "
          onClick={() => history.push("../contact")}
        >
          {Lang === "en" ? "Contact" : "اتصل"}
        </button>
      </div>

      {/************** search area ***********/}
      <div className="col-3 d-none d-lg-block my-auto ">
        <Search />
      </div>

      {/************** cart & wishlist and user ***********/}
      <div className="col-6 col-sm-4 col-md-3  row m-0 text-center ">
        <div className="col-3 p-0">
          <LangauageButton />
        </div>
        <div
          className="text-light col-3 position-relative my-auto "
          onClick={() => history.push("../wishlist")}
        >
          <li className=" fa-2x fa fa-heart link text-light "></li>
          <span
            className="    bgthree  rounded-circle p-1"
            style={{ position: "absolute", top: -10, left: "70%" }}
          >
            {WishList.length}
          </span>
        </div>

        <div
          className="text-light col-3  position-relative my-auto "
          onClick={() => history.push("../cart")}
        >
          <li className=" fa-2x far fa-shopping-cart link text-light "></li>
          <span
            className="     bgthree  rounded-circle p-1"
            style={{ position: "absolute", top: -10, left: "70%" }}
          >
            {Cart.length}
          </span>
        </div>
        <div
          className="text-light col-3 my-auto "
          onClick={() => setMenuToggle(!MenuToggle)}
        >
          <li className=" fa-2x fa fa-user-circle link text-light "></li>
        </div>
        <div hidden={MenuToggle}>
          <UserMenu MenuToggle={MenuToggle} setMenuToggle={setMenuToggle} />
        </div>
      </div>
      {/************** md screen ***********/}
      <div className=" row m-0  d-lg-none p-0 mt-2 ">
        <div className=" col-sm-7 text-light text-center my-auto p-0 ">
          <button
            className="btn-one  btn  px-1 col-3 btn-lg"
            onClick={() => history.push("../home")}
          >
            {Lang === "en" ? "Home" : "الرئيسية"}
          </button>
          <button
            className="btn-one  btn  px-1 col-3 btn-lg"
            onClick={() => history.push("../products")}
          >
            {Lang === "en" ? "Shop" : "تسوق"}
          </button>
          <button
            className="btn-one  btn  px-1 col-3 btn-lg "
            onClick={() => history.push("../about")}
          >
            {Lang === "en" ? "About" : "من نحن"}
          </button>
          <button
            className="btn-one  btn  px-1 col-3 btn-lg"
            onClick={() => history.push("../contact")}
          >
            {Lang === "en" ? "Contact" : "اتصل"}
          </button>
        </div>
        <div className=" col-sm-5  m-auto">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
