import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgeFalse, getAgeTrue } from "../../store/reducer/getAgeSlice";
import "./GetAgeModal.css";

export const GetAgeModal = ({ close }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { getAgeBool } = state.getAgeSlice;

  return (
    <section className={!getAgeBool ? "popup_parent" : "popup_parent_close"}>
      <div className="popup_container">
        <h2>ВАМ УЖЕ ЕСТЬ 18?</h2>
        <p>
          {" "}
          В соответствии с законодательством Российской Федерации, посещение
          нашего сайта допускается только по достижении 18 лет.
          <br />
          <br />
          Нажав «Да» и оставаясь на странице, вы подтверждаете, что достигли
          установленного законом возраста для приобретения и потребления
          табачных изделий.
        </p>
        <div className="buttons_parent">
          <button onClick={() => dispatch(getAgeTrue())} className="button">
            ДА
          </button>
          <button onClick={close} className="button">
            НЕТ
          </button>
        </div>
      </div>
    </section>
  );
};
