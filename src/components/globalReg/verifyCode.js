import React, { useState } from "react";

import {
  InputContainer,
  PhoneInputFunc,
} from "../inputContainer/inputContainer";
import "./globalRegPopup.css";

import { useContext } from "react";
import { Context } from "../../context/Context";

export const VerifyCode = () => {
  const [formData, setFormData] = useState({
    password_confirmation: "",
    password: "",
    verify_code: "",
  });

  const handleInputChange = (event) => {
    if (event.target.name === "verify_code") {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    value.setPopupVerifyPhone(false);
    // grum en api n
    setFormData({
      verify_code: "",
    });
  };

  const value = useContext(Context);

  if (value.popup_verify_phone) {
    return (
      <section className="global_reg_popup">
        <form
          className="registration_parent"
          onSubmit={handleSubmit}
          autoComplete={"off"}
        >
          <div className="popup_title_and_close_button">
            <h2>
              Подтверждение номера <br /> телефона
            </h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setPopupVerifyPhone(false)}
            />
          </div>

          <InputContainer
            inputTitle={"Код подтверждения"}
            inputType={"text"}
            required={true}
            minimum={4}
            maximum={6}
            maxLength={6}
            TitleStyle={{
              color: "white",
            }}
            inputStyle={{
              background: "transparent",
              border: "1px solid white",
              caretColor: "white",
              color: "white",
              textAlign: "center",
              letterSpacing: 10,
            }}
            name="verify_code"
            autoFocus={true}
            onChange={handleInputChange}
            inputValue={formData.verify_code}
          />
          <div className="register_button_parent">
            <button type="submit" className="register_button">
              ПРОДОЛЖАТЬ
            </button>
          </div>
        </form>
      </section>
    );
  }
};
