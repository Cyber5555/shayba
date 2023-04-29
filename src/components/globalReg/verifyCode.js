import React, { useEffect, useState } from "react";
import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import {
  setPopupVerifyPhone,
  verifyPhoneRequest,
} from "../../store/reducer/verifyPhoneSlice";
import { SyncLoader } from "react-spinners";

export const VerifyCode = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, success, verify_error, popup_verify_phone } = state.verify;
  const [verify_code, setVerify] = useState("");

  const handleInputChange = (event) => {
    setVerify(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();
    form_data.append("phone_verify", verify_code);
    form_data.append("phone", localStorage.getItem("phone"));

    dispatch(verifyPhoneRequest(form_data));
  };

  const value = useContext(Context);

  useEffect(() => {
    if (success) {
      dispatch(setPopupVerifyPhone(false));
      window.location.reload()
      localStorage.removeItem("phone");
      setVerify("");
    }
  }, [success]);

  if (popup_verify_phone) {
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
              onClick={() => dispatch(setPopupVerifyPhone(false))}
            />
          </div>

          <InputContainer
            inputTitle={
              "Мы отправили звонок на ваш номер телефона. Введите последние 4-и цифры"
            }
            inputType={"text"}
            // minimum={4}
            // maximum={4}
            maxLength={4}
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
            inputValue={verify_code}
            error={verify_error}
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
