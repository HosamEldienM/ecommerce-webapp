import { useContext, useEffect, useRef } from "react";
import { LangContext } from "../contexts/contexts";

const Paypal = ({ Paid, setPaid, totlaPrice }) => {
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "USD",
                  value: totlaPrice(),
                },
              },
            ],
          });
        },
        onApprove: () => {
          setPaid(true);
        },
        onError: (err) => {
          alert(err);
        },
      })
      .render(paypal.current);
  }, []);
  var paypal = useRef();
  return (
    <>
      {!Paid && (
        <div className="text-center h5">
          {Lang === "en"
            ? `Total Price: ${totlaPrice()} EGP`
            : `إجمالي السعر:  ${totlaPrice()} جنيه`}
          <br />
          <br />
          <div ref={paypal}></div>
        </div>
      )}
      {Paid && (
        <h5 className="text-center txtone my-5">
          {Lang === "en" ? "Amount paid successfully" : "تم الدفع بنجاح"}
        </h5>
      )}
    </>
  );
};

export default Paypal;
