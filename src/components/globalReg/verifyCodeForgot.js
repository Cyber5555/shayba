import React, { useEffect, useState } from "react";
import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { verifyForgotRequest } from "../../store/reducer/verifyForgotSlice";

export const VerifyCodeForgot = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, success, verify_error } = state.verifyForgot;
  const [verify_code, setVerify] = useState("");
  let phone;
  const handleInputChange = (event) => {
    setVerify(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(
      verifyForgotRequest({
        phone_verify: verify_code,
        phone: localStorage.getItem("phone"),
      })
    );
  };

  const value = useContext(Context);

  useEffect(() => {
    if (success) {
      value.setNewPassword(true);
      value.setVerifyPhoneForgot(false);
      localStorage.setItem("phone_verify", verify_code);
      setVerify("");
    }
  }, [success]);

  if (value.verify_phone_forgot) {
    return (
      <section className="global_reg_popup">
        <form
          className="registration_parent"
          onSubmit={handleSubmit}
          autoComplete={"off"}
        >
          <div className="popup_title_and_close_button">
            <h2 style={{ textTransform: "uppercase" }}>
              Подтверждение номера <br /> телефона
            </h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setVerifyPhoneForgot(false)}
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
              <button
                type="submit"
                className="register_button"
                style={{ textTransform: "uppercase" }}
              >
                Подтвердить
              </button>
            )}
          </div>
        </form>
      </section>
    );
  }
};
