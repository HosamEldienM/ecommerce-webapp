import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { CartContext } from "../contexts/cartcontext";
import { LangContext } from "../contexts/contexts";

const CartItem = ({ product, order }) => {
  const { Lang } = useContext(LangContext);
  const { removeFromCart, increment, decrement } = useContext(CartContext);
  const history = useHistory();

  return (
    <div className="m-1 my-3 row   shadow bg-white p-1 py-2 rounded ">
      <div className="col-4  ">
        <img
          className=" my-1 border  rounded link"
          src={product.Image}
          style={{ height: 140, width: "100%" }}
          onClick={() => history.push(`./products/${product.ID}`)}
        />
      </div>
      <div className=" col-8  ">
        <div>
          <h5
            className="link "
            onClick={() => history.push(`./products/${product.ID}`)}
          >
            {Lang == "en" ? product.EnName : product.ArName}
          </h5>
          <h5 className="txtone ">
            {product.Price * product.Quantity}
            {Lang == "en" ? " EGP" : " جنيه"}
          </h5>
        </div>
        <div className="row mt-4 m-auto  ">
          <div className="col-7 p-0 ">
            <button
              hidden={order}
              className="btn btn-outline-secondary m-2 border-0 p-1 px-2"
              onClick={() => decrement(product)}
              disabled={product.Quantity == 1}
            >
              <h3>-</h3>
            </button>
            {order && (Lang === "en" ? "quantity:" : "الكمية: ")}
            <span className="border border-one p-2 rounded mx-2">
              {product.Quantity}
            </span>
            <button
              hidden={order}
              className="btn btn-outline-one m-2 border-0 p-1"
              onClick={() => increment(product)}
            >
              <h3>+</h3>
            </button>
          </div>
          <div className="col-4 my-auto" hidden={order}>
            <button
              className="btn btn-outline-danger border-0 "
              onClick={() => removeFromCart(product.ID)}
            >
              {Lang == "en" ? "Remove" : "مسح"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
