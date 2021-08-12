import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../config/config";
import { LangContext, UserContext } from "../contexts/contexts";
import SignOutButton from "./signoutbutton";

const UserMenu = ({ MenuToggle, setMenuToggle }) => {
  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  const history = useHistory();

  return (
    <div
      className={`col-6 col-sm-5 col-md-3 col-lg-2 position-absolute bg-white rounded shadow p-3 ${
        Lang === "en" ? "end-0" : "start-0"
      }`}
      style={{ zIndex: 2 }}
    >
      <div>
        <h5>
          {Lang === "en" ? "Welcome " : "مرحباً "}
          {User ? (
            <>
              {User.Name}
              <br />
              <br />
              <small>{User && User.Email}</small>
            </>
          ) : (
            <div>
              <button
                className="btn btn-outline-one border-0"
                onClick={() => {
                  setMenuToggle(!MenuToggle);
                  history.push("../login");
                }}
              >
                {Lang === "en" ? "Login" : "دخول"}
              </button>
              <br /> <br />
              <h6 className="m-0">
                {Lang === "en" ? "Not a member?" : "لست عضواً؟"}
              </h6>
              <button
                className="btn btn-outline-one border-0 border"
                onClick={() => {
                  setMenuToggle(!MenuToggle);
                  history.push("../signup");
                }}
              >
                {Lang === "en" ? "Sign Up" : "إنشاء حساب"}
              </button>
            </div>
          )}
        </h5>
      </div>
      <div></div>
      <div>
        {User && (
          <>
            <br />
            <button
              className="btn btn-outline-one border-0 mx-2"
              onClick={() => {
                history.push("../orders");
                setMenuToggle(true);
              }}
            >
              {Lang === "en" ? "Orders" : "الطلبات"}
            </button>
            <SignOutButton
              MenuToggle={MenuToggle}
              setMenuToggle={setMenuToggle}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default UserMenu;
