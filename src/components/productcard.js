import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../contexts/cartcontext";
import { WishListContext } from "../contexts/wishlistcontext";

const ProductCard = ({ product, Lang, wihsist }) => {
  const { addToCart, isInCart, removeFromCart } = useContext(CartContext);
  const { removeFromWishList, addToWishList, isInWishList } =
    useContext(WishListContext);
  const [Overlay, setOverlay] = useState(false);
  const history = useHistory();

  return (
    <div
      className=" product m-2 card  col-11 col-sm-8  col-md-5 col-lg-4 col-xl-3 p-0 border-0 myshadow rounded"
      onMouseOver={() => {
        setOverlay(true);
      }}
      onMouseOut={() => setOverlay(false)}
    >
      <img style={{ height: 250 }} src={product.Image} className="rounded" />
      <div
        className="card-img-overlay "
        style={{
          background: "#e4d2ff90",
          height: 250,
          transition: "0.7s ease",
          opacity: !Overlay ? "0" : "1",
        }}
      >
        <button
          className="btn   mt-5  p-0"
          onClick={() => addToWishList(product)}
          hidden={isInWishList(product.ID)}
        >
          <i className="far fa-3x fa-heart text-danger "></i>
        </button>

        <button
          className="btn   mt-5  p-0"
          onClick={() => removeFromWishList(product.ID)}
          hidden={!isInWishList(product.ID)}
        >
          <i className="fa-3x fa fa-heart text-danger "></i>
        </button>

        <br />
        <br />
        <button
          className="btn "
          onClick={() => history.push(`./products/${product.ID}`)}
        >
          <i className="fa-3x far fa-eye  txtone  "></i>
        </button>
      </div>
      <div
        style={{ height: 160 }}
        className="p-3 link "
        onClick={() => history.push(`./products/${product.ID}`)}
      >
        <h5 style={{ height: 50 }}>
          {Lang === "en" ? product.EnName : product.ArName}
        </h5>

        <p>
          <span>{product.Price} </span>
          {Lang === "en" ? " EGP" : " جنيه"}
        </p>

        <p>
          {Lang === "en" ? "Orders: " : "عدد الطلبات: "}
          {product.Purchses}
        </p>
      </div>

      <button
        className="btn btn-one "
        onClick={() => addToCart(product)}
        hidden={isInCart(product.ID)}
      >
        {Lang === "en" ? "Add To Cart" : "إضافة لعربة التسوق"}
      </button>
      <button
        className="btn btn-outline-secondary border-0 "
        onClick={() => removeFromCart(product.ID)}
        hidden={!isInCart(product.ID)}
      >
        {Lang === "en" ? "Remove from cart" : "إزالة من عربة التسوق"}
      </button>
      {wihsist && (
        <button
          className="btn btn-outline-secondary border-0 "
          onClick={() => removeFromWishList(product.ID)}
        >
          {Lang === "en" ? "Remove from wishlist" : "إزالة من قائمة الرغبات"}
        </button>
      )}
    </div>
  );
};

export default ProductCard;
