import { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import OrderElement from "../components/orderelement";
import { auth, db } from "../config/config";
import { LangContext } from "../contexts/contexts";
const OrdersPage = () => {
  const { Lang } = useContext(LangContext);
  const [Orders, setOrders] = useState([]);
  const history = useHistory();
  useEffect(() => {
    let Store = [];
    if (auth.currentUser)
      db.collection("Users")
        .doc(auth.currentUser.uid)
        .collection("Orders")
        .get()
        .then((res) => {
          res.forEach((order) => {
            Store.push({ ...order.data(), ID: order.id });
          });
          setOrders(Store);
        });
  }, [auth.currentUser]);

  return (
    <div className="row  col-lg-9 myshadow bgtwo mx-auto p-4 justify-content-around rounded m-auto ">
      <h1 className="txtone text-center p-2">
        {Lang == "en" ? "ORDERS" : "الطلبات"}
      </h1>
      {Orders.length === 0 && (
        <div className="h1 text-center m-5 txtone p-5 ">
          {Lang == "en" ? "you have no orders yet" : "لم تقم بطلبات بعد"}
          <br />
          <div
            className="btn btn-outline-one mt-5 "
            onClick={() => history.push("./products")}
          >
            {Lang == "en" ? "GO Shopping" : "تسوق الآن"}
          </div>
        </div>
      )}

      {Orders.length > 0 &&
        Orders.sort((a, b) => b.timestamp - a.timestamp).map((order, index) => (
          <OrderElement order={order} key={index} />
        ))}
    </div>
  );
};

export default OrdersPage;
