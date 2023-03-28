import React from "react";
import "./basket.css";
export const BasketEmpty = ({ res }) => {
  return (
    <main className="basket_layout">
      <div className="basket_header">
        <h2>КОРЗИНА</h2>
        <ul>
          <li>КАТАЛОГ</li>
          <span></span>
          <li>КОРЗИНА</li>
        </ul>
      </div>
      <div className="empty_text_container">
        <h3 className="address_shipping">
          ВАШ ЗАКАЗ ВЫ СМОЖЕТЕ ЗАБРАТЬ В НАШЕМ МАГАЗИНЕ ПО АДРЕСУ: УЛ.
          КРАХМАЛЕВА, 37
        </h3>
        <span className="box_for_empty_text">
          <img
            src={require("../../assets/icons/box.png")}
            alt=""
            className="empty_bug"
          />
          <p className="empty_bug_text">ВАША КОРЗИНА ПУСТА</p>
        </span>
        <p className="recommendation">ПЕРСОНАЛЬНЫЕ РЕКОМЕНДАЦИИ</p>
      </div>
      <img
        src={require("../../assets/3dImages/Shape-25.png")}
        alt=""
        className="basket_image_empty"
      />
    </main>
  );
};
