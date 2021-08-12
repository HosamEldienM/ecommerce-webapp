import { useContext, useState } from "react";
import { LangContext } from "../contexts/contexts";
import CartItem from "./cartitem";
const OrderElement = ({ order }) => {
  const { Lang } = useContext(LangContext);
  // const [Toggle, setToggle] = useState(true);
  return (
    <div className="border  p-3 bg-light rounded shadow my-3">
      <div className="row m-0">
        <div className=" h5 txtone ">
          {Lang === "en" ? "Order ID: " : "رقم الطلب: "} {order.ID}
        </div>
        {/* <div
          className="my-auto text-center col-4"
          onClick={() => setToggle(!Toggle)}
        >
          <button className="btn btn-one m-auto">Show / hide products</button>
        </div> */}

        <div className="col-md-5 mt-3 ps-4 ">
          <div>
            {Lang === "en" ? "Status: " : "الحالة: "}
            {Lang === "en"
              ? order.status
              : order.status === "new"
              ? "جديد"
              : order.status === "accepted"
              ? "مقبول"
              : "ملغي"}
          </div>
          <div>
            {Lang === "en" ? "Placed on: " : "تاريخ الطلب: "}{" "}
            {String(new Date(order.timestamp)).substring(4, 21)}
          </div>
          <div>
            {Lang === "en" ? "Total price: " : "السعر الإجمالي: "} {order.price}
          </div>
          <hr />
          <div> {order.userName}</div>
          <div> {order.address}</div>
          <div> {order.phone}</div>
          <div> {order.userEmail}</div>
        </div>
        <div className="col-md-7 ">
          <div
          // hidden={Toggle}
          >
            {order.products.map((product) => (
              <CartItem product={product} order />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderElement;
