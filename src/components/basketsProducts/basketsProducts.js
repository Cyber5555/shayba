import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
export const BasketsProducts = () => {
  return (
    <div className="baskets_products">
      <div style={{ display: "flex", gap: 20 }}>
        <img
          src={require("../../assets/images/puff5.png")}
          alt=""
          style={{ height: "100%", background: "#F2F2F2", borderRadius: 20 }}
        />
        <div className="baskets_products_left_child">
          <h2 className="baskets_products_name">
            HQD MANGO ICE 3% + ТЕКСТ ТЕКСТ ТЕКСТ
          </h2>
          <p className="baskets_products_art">АРТ.: ART-6 945</p>
          <span className="baskets_products_all_count">НАЛИЧИЕ: 1000 ШТ</span>
        </div>
      </div>
      <div className="baskets_products_right_child">
        <p className="baskets_products_price">950₽ </p>
        <div className="add_price">
          <button className="buttons" name="minus">
            <FontAwesomeIcon icon={faMinus} fill="#fff" color="white" />
          </button>
          <p className="price_count">{1}</p>
          <button className="buttons" name="plus">
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};
