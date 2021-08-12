import HomePage from "./products";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../config/config";
import { useHistory } from "react-router-dom";
import { LangContext, UserContext } from "../contexts/contexts";
const SignUp = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [RePassword, setRePassword] = useState("");
  const [NameError, setNameError] = useState("");
  const [EmailError, setEmailError] = useState("");
  const [PasswordError, setPasswordError] = useState("");
  const history = useHistory();
  const { Lang } = useContext(LangContext);
  const { User } = useContext(UserContext);
  useEffect(() => {
    if (User) history.push("../home");
  }, [User]);

  function signUp(e) {
    e.preventDefault();
    if (Name.length < 3)
      setNameError(
        Lang === "en"
          ? "Name must be three letters or more"
          : "الاسم يجب أن يتكون من ثلاثة أحرف على الأقل"
      );
    // let check = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(Email);
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
    if (Password.length >= 8 && Password !== RePassword) {
      setPasswordError(
        Lang === "en" ? "Passwords don't match" : "كلمتا السر لا تطابقان"
      );
    }

    if (
      !check ||
      !Email ||
      !Name ||
      Password.length < 8 ||
      Name.length < 3 ||
      Password !== RePassword
    )
      return;

    auth
      .createUserWithEmailAndPassword(Email, Password)
      .then((cred) => {
        db.collection("Users").doc(cred.user.uid).set({
          Name: Name,
          Email: Email,
          CreatedAt: new Date().getTime(),
        });
      })
      .catch((err) =>
        setEmailError(
          Lang === "en" ? err.message : "صيغة البريد الإكتروني غير صالحة"
        )
      );
  }
  return (
    <form className="form-group container bgtwo py-5  px-5 col-10 col-sm-7 col-md-5 col-lg-4  rounded  myshadow">
      <h2 className="text-center txtone">
        {Lang === "en" ? "Sign Up" : "إنشاء حساب جديد"}
      </h2>
      <hr />
      <label>{Lang === "en" ? "Name" : "الاسم"}</label>
      <input
        value={Name}
        className="form-control mt-2 "
        placeholder={Lang === "en" ? "Your Name" : "ادخل اسمك"}
        onChange={(e) => {
          setNameError("");
          setName(e.target.value);
        }}
      />
      <div className="text-danger mb-3">{NameError}</div>
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
        type="password"
        value={Password}
        className="form-control mt-2 "
        placeholder={Lang === "en" ? "Your Password" : "ادخل كلمة السر"}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
        }}
      />
      <br />
      <label>{Lang === "en" ? "Re-type password" : "تأكيد كلمة السر"}</label>
      <input
        type="password"
        value={RePassword}
        className="form-control mt-2 "
        placeholder={
          Lang === "en" ? "Re-type your Password" : "ادخل كلمة السر مرة أخرى"
        }
        onChange={(e) => {
          setRePassword(e.target.value);
          setPasswordError("");
        }}
      />

      <div className="text-danger">{PasswordError}</div>
      <div className="text-center">
        <button
          className="btn btn-one col-8 mt-4"
          onClick={(e) => {
            signUp(e);
          }}
        >
          {Lang === "en" ? "Sign Up" : "تسجيل"}
        </button>
        <p className="mt-3 mb-0 ">
          {Lang === "en" ? "Already a member?" : "لديك حساب؟"}
        </p>
        <button
          className="btn btn-outline-two txtone border-0 col-8 m-0"
          onClick={(e) => {
            e.preventDefault();
            history.push("./login");
          }}
        >
          {Lang === "en" ? "Login" : "تسجيل الدخول"}
        </button>
      </div>
    </form>
  );
};

export default SignUp;
