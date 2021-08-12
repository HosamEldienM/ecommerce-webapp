import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/config";
import { LangContext } from "../contexts/contexts";

const Contact = () => {
  const { Lang } = useContext(LangContext);

  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Subject, setSubject] = useState("");
  const [Message, setMessage] = useState("");

  function submit() {
    if (!Email || !Message) {
      toast(
        Lang === "en"
          ? "please make sure to enter email and message"
          : "برجاء التأكد من إدخال البريد الإلكتروني والرسالة",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: "alert alert-danger   py-3 m-0 text-center",
          className: "m-0 p-0 ",
        }
      );

      return;
    }

    if (Message.length < 25) {
      toast(
        Lang === "en"
          ? "message should be 25 charachter at least"
          : "الرسالة يجب أن تتكون من 25 حرفاً على الأقل",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeButton: false,
          bodyClassName: "alert alert-danger   py-3 m-0 text-center",
          className: "m-0 p-0 ",
        }
      );

      return;
    }

    db.collection("Feedaback")
      .add({
        Name,
        Email,
        Subject,
        Message,
        timestamp: new Date().getTime(),
        status: "new",
      })
      .then(() => {
        setSubject("");
        setEmail("");
        setMessage("");
        setName("");
        toast(
          Lang === "en"
            ? "message sent successfully"
            : "تم إرسال الرسالة بنجاح",
          {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeButton: false,
            bodyClassName: "alert alert-success   p-3 m-0 text-center",
            className: "m-0 p-0 ",
          }
        );
      });
  }
  return (
    <div className="row m-0 p-3 my-4">
      <h1 class="txtone   m-auto text-center pb-4">
        {Lang === "en" ? "CONTACT US" : "اتصل بنا"}
      </h1>
      <div className="col-md-6 mb-3">
        <div class="row px-4">
          <div class=" col-md-6 mb-3">
            <label>{Lang === "en" ? "Name" : "الاسم"}</label>
            <input
              value={Name}
              type="text"
              class="form-control mt-1"
              placeholder={Lang === "en" ? "Name" : "الاسم"}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div class="col-md-6 mb-3">
            <label>
              {Lang === "en" ? "Email" : "البريد الإلكتروني"}
              <span className="text-danger">*</span>
            </label>
            <input
              value={Email}
              type="email"
              class="form-control mt-1"
              placeholder={Lang === "en" ? "Email" : "البريد الإلكتروني"}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label>{Lang === "en" ? "Subject" : "الموضوع"}</label>
            <input
              value={Subject}
              type="text"
              class="form-control mt-1"
              placeholder={Lang === "en" ? "Subject" : "الموضوع"}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div class="mb-3">
            <label>
              {Lang === "en" ? "Message" : "الرسالة"}
              <span className="text-danger">*</span>
            </label>
            <textarea
              value={Message}
              class="form-control mt-1"
              placeholder={Lang === "en" ? "Message" : "الرسالة"}
              rows="8"
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div class="mt-2  row ms-auto px-4">
            <div class=" col-7 col-lg-9"></div>
            <button
              class="btn col-5 col-lg-3 btn-one btn-lg px-2"
              onClick={submit}
            >
              {Lang === "en" ? "Let’s Talk" : "تحدث إلينا"}
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6 my-4 ">
        <iframe
          className="rounded myshadow"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3642.035469042362!2d32.90063893282834!3d24.100248104849406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14367b3479f89fa7%3A0x31adfa4b860b7e9c!2sAswan%20Train%20Station!5e0!3m2!1sen!2seg!4v1626253321458!5m2!1sen!2seg"
          width="100%"
          height="400"
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
