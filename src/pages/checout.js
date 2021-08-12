import { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Paypal from "../components/paypal";
import { auth, db } from "../config/config";
import { CartContext } from "../contexts/cartcontext";
import { LangContext, UserContext } from "../contexts/contexts";

const CheckOut = () => {
  const { Cart, removeCart, totlaPrice } = useContext(CartContext);
  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  const [Paid, setPaid] = useState(false);
  const [Address, setAddress] = useState();
  const [Phone, setPhone] = useState();
  const [Loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (Cart.length === 0) history.push("../cart");
  }, []);
  //adding an order
  function addOrder() {
    setLoading(true);
    const order = {
      products: Cart,
      timestamp: new Date().getTime(),
      status: "new",
      address: Address,
      price: totlaPrice(),
      phone: Phone,
      userEmail: User.Email,
      userName: User.Name,
      userID: User.ID,
    };
    db.collection("Users")
      .doc(User.ID)
      .collection("Orders")
      .add(order)
      .then((res) => {
        db.collection("Orders")
          .doc(res.id)
          .set(order)
          .then(() => {
            removeCart();
            setLoading(false);

            toast(
              Lang === "en"
                ? "Order added successfully"
                : "تم إضافة الطلب بنجاح",
              {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeButton: false,
                bodyClassName: "alert alert-success  p-3 m-0 text-center",
                className: "m-0 p-0 ",
              }
            );

            history.push("../orders");
          });
      });
    Cart.forEach((product) => {
      db.collection("products")
        .doc(product.ID)
        .update({ Purchses: product.Purchses + 1 });
    });
  }

  // paypal test
  // const [Checkout, setCheckout] = useState(false);

  return (
    <form className="col-10 col-sm-8 col-md-6 col-lg-4 bgtwo rounde myshadow m-auto p-4 ">
      <h1 class="txtone   m-auto text-center pb-4">
        {Lang === "en" ? "CHECKOUT" : "إتمام الطلب"}
      </h1>
      <p>
        {Lang === "en"
          ? "Please enter your address and phone number and complete your payment toplace your order"
          : "برجاء إدخال عنوانك ورقم تليفونك وإكمال عملية الدفع لإتمام طلبك"}
      </p>
      <div className=" m-auto form-group  my-4">
        <label>{Lang === "en" ? "Address" : "العنوان"}</label>

        <input
          className="form-control"
          value={Address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className=" m-auto form-group  my-2">
        <label>{Lang === "en" ? "Phone no." : "رقم الهاتف"}</label>
        <input
          type="number"
          className="form-control"
          value={Phone}
          onChange={(e) => {
            setPhone(e.target.value);
          }}
        />
      </div>
      <div className="col-md-8 m-auto mt-4">
        <Paypal Paid={Paid} setPaid={setPaid} totlaPrice={totlaPrice} />
      </div>
      <div className="text-center">
        <button
          disabled={!Paid || !Phone || !Address || Loading}
          className="btn btn-one col-8 col-md-6"
          onClick={(e) => {
            e.preventDefault();
            addOrder();
          }}
        >
          {Lang === "en" ? "Place order" : "إضافة الطلب"}
        </button>
      </div>
    </form>
  );
};

export default CheckOut;
