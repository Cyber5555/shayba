import React from "react";
import "./globalRegPopup.css";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { closeSuccessModalPassword } from "../../store/authReducer/changePasswordSlice";
import { closeSuccessModalEmail } from "../../store/authReducer/verifyEmailSlice";
import { closeSuccessModalFeedback } from "../../store/authReducer/feedbackSlice";
import {closeSuccessModalFio} from "../../store/authReducer/changeFIOSlice";

export const SuccessModal = () => {
  const state = useSelector((state) => state);
  const { success_modal_password } = state.changePasswordSlice;
  const { success_email } = state.verifyEmailSlice;
  const { success_feedback } = state.feedbackSlice;
  const { success_fio } = state.changeFIOSlice;

  const dispatch = useDispatch();
  if (
    success_modal_password ||
    success_email ||
    success_feedback ||
    success_fio
  ) {
    return (
      <section className="global_reg_popup">
        <div className="registration_parent">
          <div className="popup_title_and_close_button">
            <h2 style={{ textTransform: "uppercase", textAlign: "center" }}>
              {success_feedback
                ? "Наш администратор свяжется с Вами"
                : `Вы успешно изменили ${
                    success_email ? "e-mail" : success_fio ? "имя" : "пароль"
                  }`}
            </h2>
          </div>
          <AiOutlineCheckCircle
            color={"#fff"}
            size={100}
            style={{ margin: "0 auto" }}
          />
          <div className="register_button_parent">
            <button
              className="register_button"
              onClick={() => {
                dispatch(closeSuccessModalEmail());
                dispatch(closeSuccessModalPassword());
                dispatch(closeSuccessModalFeedback());
                dispatch(closeSuccessModalFio())
              }}
            >
              Закрыть
            </button>
          </div>
        </div>
      </section>
    );
  }
};
