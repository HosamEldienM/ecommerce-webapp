import { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import ImageModal from "../components/imagemodal";
import { db } from "../config/config";
import { CartContext } from "../contexts/cartcontext";
import { LangContext } from "../contexts/contexts";
import { WishListContext } from "../contexts/wishlistcontext";
const ProductDetails = () => {
  const [Product, setProduct] = useState({});
  const {
    Cart,
    getCart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    isInCart,
  } = useContext(CartContext);
  const { removeFromWishList, addToWishList, isInWishList } =
    useContext(WishListContext);
  const { Lang } = useContext(LangContext);
  const params = useParams();
  const [Toggle, setToggle] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const productID = params.id;

    db.collection("products")
      .doc(productID)
      .get()
      .then((res) => {
        setProduct({ ...res.data(), ID: res.id });
      });
  }, []);

  return (
    <div class=" my-5 ">
      {!Product.Image && (
        <div className="h1 text-center m-5 txtone p-5 ">
          {Lang == "en" ? "Product Not Found :(" : "منتج غير موجود :("}
          <br />
          <div
            className="btn btn-outline-one mt-5 "
            onClick={() => history.push("../home")}
          >
            {Lang == "en" ? "GO to Homepage" : "العودة للصفحة الرئيسية"}
          </div>
        </div>
      )}
      {Product.Image && (
        <>
          <ImageModal
            Image={Product.Image}
            Toggle={Toggle}
            setToggle={setToggle}
          />
          <div class="row justify-content-around m-0">
            <div class="col-md-5 p-0 shadow rounded px-2 px-md-0 my-auto">
              <img
                class="card-img img-fluid btn p-0 "
                onClick={() => setToggle(false)}
                src={Product.Image}
                style={{ height: 380 }}
              />
            </div>

            <div class="col-md-6 row">
              <div class="card shadow border-0 p-4  my-auto ">
                <div className="row">
                  <div class="h2 mb-3 col-9">
                    {Lang == "en" ? Product.EnName : Product.ArName}
                  </div>
                  <div class="h2 col-3">
                    <button
                      className="btn p-0 "
                      onClick={() => addToWishList(Product)}
                      hidden={isInWishList(Product.ID)}
                    >
                      <h1>
                        <i class="far fa-heart text-danger "></i>
                      </h1>
                      <small>
                        {Lang === "en"
                          ? "Add to Wishlist"
                          : "إضافة لقائمة الرغبات"}
                      </small>
                    </button>
                    <button
                      className="btn     p-0 "
                      onClick={() => removeFromWishList(Product.ID)}
                      hidden={!isInWishList(Product.ID)}
                    >
                      <h1>
                        <i class="fa fa-heart text-danger "></i>
                      </h1>
                      <small>
                        {Lang === "en"
                          ? "Remove from Wishlist"
                          : "إزالة من قائمة الرغبات"}
                      </small>
                    </button>
                  </div>
                </div>
                <div className="mb-3">
                  <h4 className="d-inline txtone">{Product.Price}</h4>
                  <small>{Lang == "en" ? " EGP" : " جنيه"}</small>
                </div>
                <div className="mb-4">
                  <h5>{Lang == "en" ? "Description: " : " الوصف:"} </h5>
                  <p>
                    {Lang == "en"
                      ? Product.EnDescription
                      : Product.ArDescription}
                  </p>
                </div>
                <button
                  className="btn btn-one "
                  onClick={() => addToCart(Product)}
                  hidden={isInCart(Product.ID)}
                >
                  {Lang === "en" ? "Add To Cart" : "إضافة لعربة التسوق"}
                </button>
                <button
                  className="btn btn-outline-secondary border-0 col-5 m-auto"
                  onClick={() => removeFromCart(Product.ID)}
                  hidden={!isInCart(Product.ID)}
                >
                  {Lang == "en" ? "Remove from cart" : "إزالة من عربة التسوق"}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
