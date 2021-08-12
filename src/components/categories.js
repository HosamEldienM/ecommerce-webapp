import { useContext } from "react";
import { useHistory } from "react-router-dom";
import cat1 from "../assets/img/cat1.jpg";
import cat2 from "../assets/img/cat2.jpg";
import cat3 from "../assets/img/cat3.jpg";
import { LangContext } from "../contexts/contexts";
const Categories = () => {
  const { Lang } = useContext(LangContext);
  const history = useHistory();
  function navigate(ctegory) {
    history.push("../products", { category: ctegory });
  }
  return (
    <div className=" p-5 myshadow">
      <h2 className="txtone text-center pb-3">
        {Lang === "en" ? "CATEGORIES" : "الفئات"}
      </h2>
      <div className="row m-0 text-center  justify-content-around ">
        <div
          className="col-md-3 py-3 link zoom"
          onClick={() => navigate("accessories")}
        >
          <img
            src={cat1}
            class=" rounded-circle w-100 myshadow "
            style={{ maxHeight: 300 }}
          />
          <h3 className="txtone p-2">
            {Lang === "en" ? "Accessories" : "إكسسوارات"}
          </h3>
        </div>
        <div
          className="col-md-3 py-3 zoom link"
          onClick={() => navigate("clothes")}
        >
          <img
            src={cat2}
            class=" rounded-circle w-100 myshadow"
            style={{ maxHeight: 300 }}
          />
          <h3 className="txtone p-2">{Lang === "en" ? "Clothes" : "ملابس"}</h3>
        </div>
        <div
          className="col-md-3 py-3 zoom link"
          onClick={() => navigate("home")}
        >
          <img
            src={cat3}
            class=" rounded-circle w-100 myshadow"
            style={{ maxHeight: 300 }}
          />
          <h3 className="txtone p-2">
            {Lang === "en" ? "Home & living" : "المنزل والمعيشة"}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Categories;
