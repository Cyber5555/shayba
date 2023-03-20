import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAgeFalse, getAgeTrue } from "../../store/toolkitSlice";
import "./GetAgeModal.css";

export const GetAgeModal = () => {
  const dispatch = useDispatch();
  const check_age = useSelector((state) => state.toolkit.getAgeBool);

  return (
    <section className={!check_age ? "popup_parent" : "popup_parent_close"}>
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
          <button onClick={() => dispatch(getAgeTrue())} className="buttons">
            ДА
          </button>
          <button onClick={() => dispatch(getAgeFalse())} className="buttons">
            НЕТ
          </button>
        </div>
      </div>
    </section>
  );
};
