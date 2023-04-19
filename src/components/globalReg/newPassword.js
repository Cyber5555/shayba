import React, { useEffect, useState } from "react";

import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";

import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { newPasswordRequest } from "../../store/reducer/newPasswordSlice";
import { SyncLoader } from "react-spinners";

export const NewPassword = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { password_error, password_confirmation_error, success, loading } =
    state.newPassword;
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const value = useContext(Context);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // grum en api n

    dispatch(
      newPasswordRequest({
        password: formData.password,
        password_confirmation: formData.password_confirmation,
        phone: localStorage.getItem("phone"),
        phone_verify: localStorage.getItem("phone_verify"),
      })
    );
  };

  useEffect(() => {
    if (success) {
      value.setNewPassword(false);
      localStorage.removeItem("phone");
      localStorage.removeItem("phone_verify");
      setFormData({
        password: "",
        password_confirmation: "",
      });
    }
  }, [success]);

  if (value.new_password) {
    return (
      <section className="global_reg_popup">
        <form className="registration_parent" onSubmit={handleSubmit}>
          <div className="popup_title_and_close_button">
            <h2>НОВЫЙ ПАРОЛЬ</h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setNewPassword(false)}
            />
          </div>

          <InputContainer
            id={formData.password}
            inputTitle={"ПАРОЛЬ *"}
            inputType={"password"}
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
                ПРОДОЛЖАТЬ
              </button>
            )}
          </div>
        </form>
      </section>
    );
  }
};
