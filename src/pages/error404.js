import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { LangContext } from "../contexts/contexts";

const ErrorPage = () => {
  const history = useHistory();
  const { Lang } = useContext(LangContext);
  return (
    <div className="h1 text-center m-5 txtone p-5 ">
      {Lang == "en" ? "Page Not Found :(" : "صفحة غير موجودة :("}
      <br />
      <div
        className="btn btn-outline-one mt-5 "
        onClick={() => history.push("../home")}
      >
        {Lang == "en" ? "GO to Homepage" : "العودة للصفحة الرئيسية"}
      </div>
    </div>
  );
};

export default ErrorPage;
