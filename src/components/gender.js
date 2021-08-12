import { useContext } from "react";
import { useHistory } from "react-router-dom";
import man from "../assets/img/man.jpg";
import women from "../assets/img/women.jpg";

import { LangContext } from "../contexts/contexts";
const Gender = () => {
  const { Lang } = useContext(LangContext);
  const history = useHistory();
  function navigate(gender) {
    history.push("../products", { gender: gender });
  }
  return (
    <div className=" p-5 myshadow bgtwo">
      <div className="row m-0 text-center px-5 justify-content-around ">
        <div
          className="col-md-3 py-3 link zoom"
          onClick={() => navigate("men")}
        >
          <img
            src={man}
            className=" rounded-circle w-100 myshadow"
            style={{ maxHeight: 300 }}
          />
          <h3 className="txtone p-2">
            {Lang === "en" ? "Shop Men" : "منتجات رجالي"}
          </h3>
        </div>
        <div
          className="col-md-3 py-3 link zoom"
          onClick={() => navigate("women")}
        >
          <img
            src={women}
            className=" rounded-circle w-100 myshadow"
            style={{ maxHeight: 300 }}
          />
          <h3 className="txtone p-2">
            {Lang === "en" ? "Shop Women" : "منتجات حريمي"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Gender;
