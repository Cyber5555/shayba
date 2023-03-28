import React, { useState } from "react";

import {
  InputContainer,
  PhoneInputFunc,
} from "../inputContainer/inputContainer";
import "./globalRegPopup.css";

import { useContext } from "react";
import { Context } from "../../context/Context";

export const RegisterPopup = () => {
  const [checked, setChecked] = useState(false);

  const [formData, setFormData] = useState({
    password_confirmation: "",
    password: "",
    name: "",
  });

  const [phone, setPhone] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    value.setPopupVerifyPhone(true);
    value.setPopupRegister(false);
    // grum en api n
    setFormData({
      name: "",
      password_confirmation: "",
      password: "",
    });
  };

  const value = useContext(Context);

  if (value.popup_register) {
    return (
      <section className="global_reg_popup">
        <form
          className="registration_parent"
          onSubmit={handleSubmit}
          autoComplete={checked ? "on" : "off"}
          autoCapitalize="off"
        >
          <div className="popup_title_and_close_button">
            <h2 style={{ textTransform: "uppercase" }}>Регистрация</h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setPopupRegister(false)}
            />
          </div>

          <InputContainer
            id={formData.name}
            inputTitle={"ИМЯ *"}
            inputType={"password"}
            required={true}
            TitleStyle={{
              color: "white",
            }}
            inputStyle={{
              background: "transparent",
              border: "1px solid white",
              caretColor: "white",
              color: "white",
            }}
            name="name"
            onChange={handleInputChange}
            inputValue={formData.name}
          />

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
          />

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
              РЕГИСТРАЦИЯ
            </button>
          </div>
        </form>
      </section>
    );
  }
};
