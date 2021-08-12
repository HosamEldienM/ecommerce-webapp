import { useContext, useState } from "react";
import { auth, db } from "../config/config";
import React from "react";
import { LangContext, UserContext } from "./contexts";
import { toast } from "react-toastify";

export const WishListContext = React.createContext();

export const WishListProvider = ({ children }) => {
  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  const [WishList, setWishList] = useState([]);

  function getWishList() {
    let Store = [];
    if (auth.currentUser)
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .collection("WishList")
        .get()
        .then((res) => {
          res.forEach((product) => {
            Store.push(product.data());
          });
          setWishList(Store);
        });
  }

  //for adding to cart//
  function addToWishList(product) {
    if (!auth.currentUser) {
      toast(
        Lang === "en"
          ? "please login or sign up first.."
          : "برجاء تسجيل الدخول أو إنشاء حساب أولاً..",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: "bgtwo txtone  p-3 m-0 text-center",
          className: "m-0 p-0 ",
        }
      );

      return;
    }
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .collection("WishList")
      .doc(product.ID)
      .set({ ...product })
      .then(() => getWishList());
  }

  //for removing items from cart
  function removeFromWishList(id) {
    db.collection("Users")
      .doc(auth.currentUser.uid)
      .collection("WishList")
      .doc(id)
      .delete()
      .then(() => getWishList());
  }

  //check whether in cart
  function isInWishList(id) {
    for (var y of WishList) if (id === y.ID) return true;
    return false;
  }

  const value = {
    WishList,
    setWishList,
    getWishList,
    addToWishList,
    removeFromWishList,
    isInWishList,
  };
  return (
    <WishListContext.Provider value={value}>
      {children}
    </WishListContext.Provider>
  );
};
