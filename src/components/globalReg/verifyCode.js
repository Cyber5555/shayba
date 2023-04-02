import React, { useEffect, useState } from "react";
import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { verifyPhoneRequest } from "../../store/verifyPhoneSlice";
import { SyncLoader } from "react-spinners";

export const VerifyCode = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, success, verify_error } = state.verify;
  const [verify_code, setVerify] = useState();
  const [phone] = useState(localStorage.getItem("phone"));

  const handleInputChange = (event) => {
    event.target.value = event.target.value.replace(/[^0-9]/g, "");

    const { value } = event.target;
    setVerify(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let form_data = new FormData();

    form_data.append("phone_verify", verify_code);
    form_data.append("phone", phone);

    dispatch(
      verifyPhoneRequest(form_data)
    );
  };

  useEffect(() => {
    if (success) {
      value.setPopupVerifyPhone(false);
      localStorage.removeItem("phone");
      setVerify("");
    }
  }, [success]);

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
            maximum={4}
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
