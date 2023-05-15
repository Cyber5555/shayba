import React, { useEffect, useState } from "react";
import { InputContainer } from "../inputContainer/inputContainer";
import "./globalRegPopup.css";
import { useContext } from "react";
import { Context } from "../../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { verifyForgotRequest } from "../../store/reducer/verifyForgotSlice";
import { verifyEmailRequest } from "../../store/authReducer/verifyEmailSlice";

export const VerifyEmailCode = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loading, success, verify_error } = state.verifyEmailSlice;
  const [code, setCode] = useState("");
  const value = useContext(Context);

  const handleInputChange = (event) => {
    setCode(event.target.value.replace(/[^0-9]/g, ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(verifyEmailRequest({ code: code }));
  };

  useEffect(() => {
    if (success) {
      value.setEmailCode(false);
      setCode("");
    }
  }, [success]);

  if (value.email_code) {
    return (
      <section className="global_reg_popup">
        <form
          className="registration_parent"
          onSubmit={handleSubmit}
          autoComplete={"off"}
        >
          <div className="popup_title_and_close_button">
            <h2 style={{ textTransform: "uppercase" }}>
              Потверждения эл.почты
            </h2>
            <img
              src={require("../../assets/icons/close_cross.png")}
              alt="close_cross"
              onClick={() => value.setEmailCode(false)}
            />
          </div>

          <InputContainer
            inputTitle={"Ма отправили код на вашу эл.почту"}
            inputType={"text"}
            // minimum={4}
            // maximum={4}
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
            name="code"
            autoFocus={true}
            onChange={handleInputChange}
            inputValue={code}
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
