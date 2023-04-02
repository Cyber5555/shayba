import React, { useEffect, useState } from "react";

import {
  InputContainer,
  PhoneInputFunc,
} from "../inputContainer/inputContainer";
import "./globalRegPopup.css";

import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../store/registerSlice";
import { SyncLoader } from "react-spinners";

export const RegisterPopup = () => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const {
    loading,
    phone_error,
    name_error,
    password_error,
    password_confirmation_error,
    success,
  } = state.register;
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
    dispatch(
      registerRequest({
        name: formData.name,
        phone: phone,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      })
    );
  };

  useEffect(() => {
    if (success) {
      value.setPopupVerifyPhone(true);
      value.setPopupRegister(false);
      localStorage.setItem("phone", phone);
      setFormData({
        name: "",
        password_confirmation: "",
        password: "",
      });
      setPhone("");
    }
  }, [success]);

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
            inputType={"text"}
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
            error={name_error}
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
            error={phone_error}
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
            error={password_error}
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
            error={password_confirmation_error}
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
                РЕГИСТРАЦИЯ
              </button>
            )}
          </div>
        </form>
      </section>
    );
  }
};
