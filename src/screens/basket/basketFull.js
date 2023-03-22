import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./basket.css";
export const BasketFull = ({ res }) => {
  return (
    <main className="full_basket_layout">
      <div className="basket_header">
        <h2>КОРЗИНА</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>КОРЗИНА</li>
        </ul>
      </div>
      <div className="full_text_container">
        <h3 className="full_address_shipping">
          ВАШ ЗАКАЗ ВЫ СМОЖЕТЕ ЗАБРАТЬ В НАШЕМ <br />
          МАГАЗИНЕ ПО АДРЕСУ: УЛ. КРАХМАЛЕВА, 37
        </h3>
        <h3 className="total_price">ИТОГО: 1900 ₽ </h3>
        <button className="checkout_button">ОФОРМИТЬ ЗАКАЗ</button>
      </div>
      <ul className="delate_or_add">
        <li>
          В КОРЗИНЕ 2 ТОВАР(А){" "}
          <img
            src={require("../../components/icons/arrow_down.png")}
            alt=""
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </li>
        <li>
          ОЧИСТИТЬ{" "}
          <img
            src={require("../../components/icons/cross.png")}
            alt=""
            style={{ width: 20, height: 20, cursor: "pointer" }}
          />
        </li>
      </ul>
      <div className="baskets_products">
        <div style={{ display: "flex", gap: 20 }}>
          <img
            src={require("../../components/images/puff5.png")}
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
      <p className="recommendation_full">ПЕРСОНАЛЬНЫЕ РЕКОМЕНДАЦИИ</p>
    </main>
  );
};
