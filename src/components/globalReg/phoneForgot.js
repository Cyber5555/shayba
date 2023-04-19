import React, { useEffect, useState } from "react";
import { PhoneInputFunc } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { forgotPasswordRequest } from "./../../store/reducer/forgotPasswordSlice";

// /api/validation_forgot_password_code  eso forgoti codna uxarkum

export const PhoneForgot = () => {
  const dispatch = useDispatch();
  const { phone_error, loading, success } = useSelector(
    (state) => state.forgotPassword
  );

  const [phone, setPhone] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(forgotPasswordRequest({ phone: phone }));
  };

  const value = useContext(Context);

  useEffect(() => {
    if (success) {
      value.setVerifyPhoneForgot(true);
      value.setPhoneForgot(false);
      localStorage.setItem("phone", phone);

      setPhone("");
    }
  }, [success]);

  if (value.phone_forgot) {
    return (
      <section className="global_reg_popup">
        <form className="registration_parent" onSubmit={handleSubmit}>
          <div className="popup_title_and_close_button">
            <h2 style={{ textTransform: "uppercase" }}>Забыли пароль?</h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setPhoneForgot(false)}
            />
          </div>

          <PhoneInputFunc
            inputTitle={"ТЕЛЕФОН *"}
            phoneValue={phone}
            onChange={(e) => setPhone(e)}
            TitleStyle={{
              color: "white",
            }}
            inputStyle={{
              width: "100%",
              height: 40,
              background: "transparent",
              border: "1px solid white",
              borderRadius: 10,
              fontSize: 16,
              color: "white",
              marginTop: 8,
              caretColor: "white",
              fontFamily: "Regular",
            }}
            dropdownStyle={{
              top: "100%",
              overflow: "scroll",
              height: 300,
              left: 0,
              zIndex: 10,
              background: "white",
            }}
            error={phone_error}
          />

          <div className="register_button_parent">
            <SyncLoader
              color={"white"}
              loading={loading}
              cssOverride={{
                borderColor: "white",
              }}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            {!loading && (
              <button type="submit" className="register_button">
                ПРОДОЛЖАТЬ
              </button>
            )}
          </div>
        </form>
      </section>
    );
  }
};
