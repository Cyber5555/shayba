import React, { useState } from "react";

import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";

import { useContext } from "react";
import { Context } from "../../context/Context";

export const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password_confirmation: "",
    password: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    value.setForgotPassword(false);
    // grum en api n
    setFormData({
      password_confirmation: "",
      password: "",
    });
  };

  const value = useContext(Context);

  if (value.forgot_password) {
    return (
      <section className="global_reg_popup">
        <form className="registration_parent" onSubmit={handleSubmit}>
          <div className="popup_title_and_close_button">
            <h2>НОВЫЙ ПАРОЛЬ</h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setPopupRegister(false)}
            />
          </div>

          <InputContainer
            id={formData.password}
            inputTitle={"ПАРОЛЬ *"}
            inputType={"password"}
            required={true}
            minimum={6}
            TitleStyle={{
              color: "white",
            }}
            inputStyle={{
              background: "transparent",
              border: "1px solid white",
              caretColor: "white",
              color: "white",
            }}
            name="password"
            onChange={handleInputChange}
            inputValue={formData.password}
          />

          <InputContainer
            inputTitle={"Подтверждение пароля *"}
            inputType={"password"}
            required={true}
            minimum={6}
            TitleStyle={{
              color: "white",
            }}
            inputStyle={{
              background: "transparent",
              border: "1px solid white",
              caretColor: "white",
              color: "white",
            }}
            name="password_confirmation"
            onChange={handleInputChange}
            inputValue={formData.password_confirmation}
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
