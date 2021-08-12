import { useContext } from "react";
import { LangContext } from "../contexts/contexts";

const LangauageButton = () => {
  const { Lang, setLang } = useContext(LangContext);
  return (
    <button
      className="btn btn-one border-0 py-3"
      onClick={() => {
        if (Lang == "en") {
          setLang("ar");
          document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
          document.getElementsByTagName("body")[0].style.textAlign = "right";
        }
        if (Lang == "ar") {
          setLang("en");
          document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
          document.getElementsByTagName("body")[0].style.textAlign = "left";
        }
      }}
    >
      {Lang == "en" ? "عربي" : "En"}
    </button>
  );
};

export default LangauageButton;
