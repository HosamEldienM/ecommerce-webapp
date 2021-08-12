import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LangContext } from "../contexts/contexts";

const Footer = () => {
  const { Lang } = useContext(LangContext);

  const history = useHistory();
  function navigate(ctegory) {
    history.push("../products", { category: ctegory });
  }
  return (
    <div class="row m-0  px-md-5 bgone text-light">
      <div class="col-md-4 py-4 px-5 ">
        <h3
          class="border-bottom pb-3 border-light link mylogo"
          onClick={() => history.push("../home")}
        >
          ASWANA
        </h3>

        <div>
          <i class="fa fa-home fa-fw"></i>
          {Lang === "en"
            ? "121 Nile Corniche - Aswan"
            : "121 كورنيش النيل - أسوان"}
        </div>
        <div>
          <i class="fa fa-phone fa-fw"></i> 0100200340
        </div>
        <div>
          <i class="fa fa-envelope fa-fw"></i>
          {"  info@aswana.com"}
        </div>
      </div>
      <div class="col-md-4 py-4 px-5 ">
        <h3 class="border-bottom pb-3 border-light logo">
          {Lang === "en" ? "Our Products" : "منتجاتنا"}
        </h3>
        <div className="h6 link" onClick={() => navigate("accessories")}>
          {Lang === "en" ? "Accessories" : "إكسسوارات"}
        </div>
        <div className=" h6 link" onClick={() => navigate("clothes")}>
          {Lang === "en" ? "Clothes" : "ملابس"}
        </div>
        <div className="h6 link" onClick={() => navigate("home")}>
          {Lang === "en" ? "Home & Living" : "المنزل والمعيشة"}
        </div>
      </div>
      <div class="col-md-4 py-4 px-5 ">
        <h3 class="border-bottom pb-3 border-light logo">
          {Lang === "en" ? "Know More" : "اعرف أكثر"}
        </h3>
        <div className="h6 link" onClick={() => history.push("../home")}>
          {Lang === "en" ? "Homepage" : "الصفحة الرئيسية"}
        </div>
        <div className="h6 link" onClick={() => history.push("../about")}>
          {Lang === "en" ? "About Us" : "من نحن"}
        </div>
        <div className="h6 link" onClick={() => history.push("../contact")}>
          {Lang === "en" ? "Contact" : "اتصل بنا"}
        </div>
      </div>

      <p class=" px-5">
        {Lang === "en"
          ? "Copyright 2021 ASWANA | Designed by Aswan Team"
          : "جميع الحقوق محفوظة؛ أسوانا 2021 | تصميم فريق أسوان"}
      </p>
    </div>
  );
};

export default Footer;
