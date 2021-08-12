import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth, db } from "../config/config";
import { LangContext, UserContext } from "../contexts/contexts";

const Login = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const history = useHistory();
  const { User } = useContext(UserContext);
  const { Lang } = useContext(LangContext);
  useEffect(() => {
    if (User) history.push("../home");
  }, [User]);

  function login(e) {
    e.preventDefault();
    let check = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(Email);
    if (!Email || !check)
      setEmailError(
        Lang === "en"
          ? "Please enter a valid email"
          : "برجاء إدخال بريد إلكتروني صالح"
      );
    if (Password.length < 8)
      setPasswordError(
        Lang === "en"
          ? "password length should be 8 or more"
          : "كلمة السر يجب أن تتكون من ثمانية أحرف على الأقل"
      );

    if (!check || !Email || Password.length < 8) return;

    auth
      .signInWithEmailAndPassword(Email, Password)

      .catch((err) => {
        err.message.length == 89
          ? setEmailError(
              Lang === "en"
                ? "email not registered"
                : "البريد الإلكتروني غير مسجل"
            )
          : setPasswordError(
              Lang === "en" ? "incorrect password" : "كلمة السر خاطئة"
            );
      });
  }

  return (
    <form className="form-group container bgtwo py-5  px-5 col-10 col-sm-7 col-md-4 col-lg-3 my-4 rounded  myshadow">
      <h2 className="text-center txtone">
        {Lang === "en" ? "LOGIN" : "تسجيل الدخول"}
      </h2>
      <hr />

      <label>{Lang === "en" ? "Email" : "البريد الإلكتروني"}</label>
      <input
        value={Email}
        className="form-control mt-2"
        placeholder={Lang === "en" ? "Your Email" : "ادخل بريدك الإلكتروني"}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError("");
        }}
      />
      <div className="text-danger mb-3">{EmailError}</div>
      <label>{Lang === "en" ? "Password" : "كلمة السر"}</label>
      <input
        value={Password}
        type="password"
        className="form-control mt-2 "
        placeholder={Lang === "en" ? "Your Password" : "ادخل كلمة السر"}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
        }}
      />
      <div className="text-danger">{PasswordError}</div>
      <div className="text-center">
        <button
          className="btn btn-one col-8 mt-4 btn-md"
          onClick={(e) => {
            login(e);
          }}
        >
          {Lang === "en" ? "LOGIN" : "دخول"}
        </button>

        <p className="mt-3 mb-1">
          {Lang === "en" ? "Not a member?" : "ليس لديك حساب؟"}
        </p>
        <button
          className="btn btn-outline-two txtone col-8 border-0"
          onClick={(e) => {
            e.preventDefault();
            history.push("./signup");
          }}
        >
          {Lang === "en" ? "Sign Up" : "إنشاء حساب"}
        </button>
      </div>
    </form>
  );
};

export default Login;
